require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../helpers/db');

const User = require('./user.model');

const Role = db.role;

// create user
// api
const createUser = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;

  const newUser = new User({
    email,
    password: bcrypt.hashSync(password, 8),
    firstName,
    lastName
  });

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).json({ err, title: 'User was not saved.' });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            return res.status(500).json({ err, message: 'Role not found' });
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return res.status(500).json({ err, message: 'User was not saved' });
            }

            return res.status(201).json({ success: true, message: 'User registered successfully' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return res.status(404).json({ err, message: 'Role not found' });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).json({ err, message: 'User was not saved' });
          }

          return res.json({ success: true, message: 'User was registered successfully!' });
        });
      });
    }
  });
};

// Login
// api
const loginUser = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findOne({
    email: req.body.email
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          err,
          title: 'Internal error.',
          detail: 'Something went wrong.'
        });
      }

      if (!user) {
        return res
          .status(404)
          .json({ title: 'User not found.', detail: 'The user could not be found.' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          title: 'Invalid Username or Password.',
          detail: 'The Username or Password is invalid.'
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET || 'localDevSecret', {
        expiresIn: 86400 // 24 hours
      });

      const authorities = [];

      for (let i = 0; i < user.roles.length; i += 1) {
        authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
      }
      return res.status(200).json({
        user,
        roles: authorities,
        accessToken: token
      });
    });
};

const getUsers = async (req, res) => {
  const { userId, iterationId } = req.query;
  let { fields } = req.query;

  const filter = {};
  if (userId) {
    filter._id = userId;
  }

  if (iterationId) {
    fields = `${fields} iterations._id`;
  }

  await User.find(filter)
    .select(fields)
    .then((users) => {
      if (!users) {
        return res
          .status(404)
          .json({ title: 'Users not found', detail: 'No user could be found.' });
      }

      const results = users.map((user) => {
        const result = user;

        if (iterationId) {
          result.iterations = result.iterations.filter((iteration) => {
            if (!iteration._id) {
              return false;
            }
            return iteration._id.toString() === iterationId.toString();
          });
        }

        return result;
      });

      return res.status(200).json({ users: results });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ err, title: 'Internal error.', detail: 'Something went wrong.' });
    });
};

const addQuestionIdsSkip = (questionIds, state) => {
  return state.concat(questionIds);
};

const removeQuestionIdsFromSkip = (questionIds, state) => {
  return state.filter((prevAnswer) => !questionIds.includes(prevAnswer));
};

const updateSkip = (prevAnswerOption, newAnswerOption, state) => {
  let newSkip = state;
  // const newSkips = userUpdate;
  if (prevAnswerOption && prevAnswerOption.skip) {
    newSkip = removeQuestionIdsFromSkip(prevAnswerOption.skip, state);
  }
  if (newAnswerOption.skip) {
    newSkip = addQuestionIdsSkip(newAnswerOption.skip, state);
  }

  return newSkip;
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  await User.findByIdAndUpdate({ _id: userId }, body, { new: true })
    .then(() => {
      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'User not updated!'
      });
    });
};

const updateIteration = async (req, res) => {
  const { userId, iterationId } = req.params;
  const { body } = req;

  const filter = {
    _id: userId,
    'iterations.iterationId': iterationId
  };

  const [entries] = Object.entries(body);
  const key = entries[0];
  const value = entries[1];

  const placeholder = {};
  placeholder[`iterations.$[iteration].${key}`] = value;

  const update = {
    $set: placeholder
  };

  const options = {
    arrayFilters: [{ 'iteration.iterationId': iterationId }],
    new: true,
    upsert: true
  };

  await User.findOneAndUpdate(filter, update, options)
    .then(() => {
      return res.status(204).send();
    })
    .catch(() => {
      // If iteration could not be updated (response === null), a new iteration is created and pushed.
      User.updateOne(
        {
          _id: userId
        },
        { $push: { iterations: { iterationId, startedAt: body.startedAt } } }
      )
        .then(() => {
          // if the uuid is created by the server instead, we need to return the id and object here
          return res.status(201).send();
        })
        .catch((err) => {
          return res.status(400).json({
            err,
            message: 'Iteration not updated!'
          });
        });
    });
};

const updateAnswer = async (req, res) => {
  const { userId, iterationId, questionId } = req.params;
  const { answerOption } = req.body;

  await User.findOne({ _id: userId })
    .then((user) => {
      const userUpdate = user;

      const iteration = userUpdate.iterations.find((i) => {
        return i.iterationId === iterationId;
      });
      let answer;
      if (iteration.answers && iteration.answers.length) {
        answer = iteration.answers.find((a) => {
          return a.questionId === questionId;
        });
      }
      if (answer) {
        answer.answerOption = answerOption;
      } else {
        iteration.answers.push({ questionId, answerOption });
      }

      userUpdate.save().then(() => {
        return res.status(204).send();
      });
    })
    .catch(() => {
      return res.status(404).json({ title: 'Users not found', detail: 'No user could be found.' });
    });
};

module.exports = {
  loginUser,
  createUser,
  getUsers,
  updateUser,
  updateIteration,
  updateAnswer
};
