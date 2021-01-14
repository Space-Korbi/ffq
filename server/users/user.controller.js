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
  await User.find({}, (err, users) => {
    if (err) {
      return res
        .status(500)
        .json({ err, title: 'Internal error.', detail: 'Something went wrong.' });
    }
    if (!users.length) {
      return res.status(404).json({ title: 'Users not found', detail: 'No users found.' });
    }
    return res.status(200).json({ users });
  }).catch((err) => console.log(err));
};

const getUsersById = async (req, res) => {
  await User.find({ _id: req.params.userId }, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users) {
      return res.status(404).json({ success: false, error: `No user found` });
    }

    let returnData;

    if (!req.query) {
      returnData = users;
    } else {
      switch (req.query.resource) {
        case 'metaData':
          returnData = {
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            hasAcceptedConsentForm: users.hasAcceptedConsentForm,
            startData: users.startDate,
            endDate: users.endDate,
            stoppedAtIndex: users.stoppedAtIndex
          };
          break;
        default:
          returnData = users;
      }
    }
    console.log(returnData);

    return res.status(200).json({ users });
  }).catch((err) => console.log(err));
};

const getAnswerById = async (req, res) => {
  await User.findOne({ _id: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!'
      });
    }

    if (!user || !user.answers.length) {
      return res.status(404).json({ success: false, error: 'No answers found' });
    }

    const submittedAnswer = user.answers.find(
      ({ questionId }) => questionId === req.params.questionId
    );

    if (!submittedAnswer) {
      return res.status(404).json({ success: false, error: 'No answer found' });
    }

    return res.status(200).json({ success: true, data: submittedAnswer });
  }).catch((err) => console.log(err));
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

const updateUserById = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { body } = req;

  User.findOne({ _id: req.params.userId })
    .then((user) => {
      const userUpdate = user;

      body.validated.forEach((entry) => {
        const key = entry[0];
        const value = entry[1];

        if (key === 'answers') {
          const index = userUpdate.answers.findIndex((answer) => {
            return answer.questionId === value.questionId;
          });
          if (index !== -1) {
            userUpdate.questionsToSkip = updateSkip(
              user.answers[index].answerOption,
              value.answerOption,
              userUpdate.questionsToSkip
            );
            userUpdate.answers[index] = value;
          } else {
            userUpdate.questionsToSkip = updateSkip(
              null,
              value.answerOption,
              userUpdate.questionsToSkip
            );
            userUpdate.answers.push(value);
          }
        } else {
          userUpdate[key] = value;
        }
      });

      console.log('----', userUpdate);

      userUpdate
        .save()
        .then(() => {
          return res.status(200).json({
            updated: body.validated,
            data: body.data.answers,
            message: 'User updated!'
          });
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: 'User not updated!'
          });
        });
    })
    .catch((err) => {
      return res.status(404).json({
        err,
        message: 'User not found!'
      });
    });
};

const resetAdminAnswers = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findOne({ _id: req.params.userId })
    .then((user) => {
      const userUpdate = user;

      userUpdate.answers = [];
      userUpdate.questionsToSkip = [];
      userUpdate.stoppedAtIndex = -1;
      userUpdate.startedOn = undefined;
      userUpdate.finishedOn = undefined;

      userUpdate
        .save()
        .then(() => {
          return res.status(204).send();
        })
        .catch((error) => {
          return res.status(404).json({
            error,
            message: 'User not updated!'
          });
        });
    })
    .catch((err) => {
      return res.status(404).json({
        err,
        message: 'User not found!'
      });
    });
};

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUsersById,
  getAnswerById,
  updateUserById,
  resetAdminAnswers
};
