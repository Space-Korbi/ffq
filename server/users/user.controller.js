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

// refactoring ...

const getUsersById = async (req, res) => {
  const { userId, iterationId } = req.query;
  let { fields } = req.query;

  const filter = {};
  if (userId) {
    filter._id = userId;
  }

  if (iterationId) {
    fields = `${fields} iterations._id`;
  }

  console.log('Filter:', filter, 'userId', userId, 'iterationId', iterationId);

  await User.find(filter)
    .select(fields)
    .then((users) => {
      console.log('Users', users);
      if (!users) {
        return res.status(404).json({ success: false, error: `No users found.` });
      }

      const results = users.map((user) => {
        const result = user;

        if (iterationId) {
          console.log('result', result);
          result.iterations = result.iterations.filter((i) => {
            if (!i._id) {
              return false;
            }
            console.log('???', i._id.toString() === iterationId.toString());
            return i._id.toString() === iterationId.toString();
          });
        }

        console.log('------result', result);
        return result;
      });

      return res.status(200).json({ results });
    });

  /*  await User.aggregate([
      // Match the document containing the array element
      { $match: { _id: mongoose.Types.ObjectId(userId) } },

      // Unwind to "de-normalize" the array content
      { $unwind: '$iterations' },

      // Match the specific array element
      { $match: { 'iterations.iterationId': iterationId } },

      // Group back and just return certain fields

      {
        $group: {
          _id: '$_id',
          answers: { $push: '$iterations.answers' }
        }
      }
    ]).then((result) => {
      console.log('=========', result[0]);
    });

    await User.find()
      .where({ _id: userId, 'iterations.iterationId': 'HrxJJR16v4P5h7CyXya-8' })
      .select({ 'iterations.$': 1 })
      .select(fields)
      .then((users) => {
        console.log('users', users);
        if (!users) {
          return res.status(404).json({ success: false, error: `No users found.` });
        }

        return res.status(200).json({ users });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err, message: 'No users found.' });
      });
  } */
};

// ... end refactoring

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

const updateUserById2 = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;

  console.log('========', body);

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

  console.log('================');
  console.log(userId, iterationId);
  console.log('------', body);
  console.log('================');

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
        .then((pushResponse) => {
          // if the uuid is created by the server instead, we need to return the id and object here
          console.log('Push Response:', pushResponse);
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

const updateUserAnswersByIds2 = async (req, res) => {
  const { userId, iterationId, questionId } = req.params;
  const { answerOption } = req.body;

  console.log('=========================');

  console.log('answerOption', answerOption);
  console.log('Ids: ', userId, iterationId, questionId);

  /**
   * Try to update answerOption if it exists.
   * If it does not exist yet, a new answerOption is pushed.
   */

  const filter = {
    _id: userId,
    'iterations.iterationId': iterationId,
    'iterations.answers.questionId': questionId
  };

  const update = {
    $set: {
      'iterations.$.answers.$[answer].answerOption': answerOption
    }
  };

  const options = {
    arrayFilters: [{ 'answer.questionId': questionId }],
    new: true,
    upsert: true
  };

  await User.findOneAndUpdate(filter, update, options)
    .then((user) => {
      console.log('UPDATED++++++', user.iterations[0].answers);
      return res.status(204).send();
    })
    .catch(() => {
      User.updateOne(
        {
          _id: userId,
          'iterations.iterationId': iterationId
        },
        { $push: { 'iterations.$.answers': { questionId, answerOption } } }
      )
        .then((response) => {
          console.log('Pushed', response);
          // if the uuid is created by the server instead, we need to return the id and object here
          return res.status(201).send();
        })
        .catch((err) => {
          return res.status(404).json({
            err,
            message: 'Answer not updated!'
          });
        });
    });

  console.log('=========================');
};

const resetAdminAnswers = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req.params;

  const update = {
    $set: {
      iterations: []
    }
  };

  User.findOneAndUpdate({ _id: userId }, update)
    .then((user) => {
      console.log('Admin update: ', user);
      return res.status(204).send();
    })
    .catch((err) => {
      return res.status(404).json({
        err,
        message: 'User not updated!'
      });
    });
};

// To Remove
/*
const updateUserById = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId } = req.params;
  const { body } = req;

  User.findOne({ _id: userId })
    .then((user) => {
      const userUpdate = user;

      console.log('HEYYYY+++++++', body.validated);
      body.validated.forEach((entry) => {
        const key = entry[0];
        const value = entry[1];

        if (key === 'iterations') {
          // find iteration
          const iterationIndex = userUpdate.iterations.findIndex((iteration) => {
            return iteration.iterationId === value.iterationId;
          });

          // if no iteration push entire iteraiton object
          if (iterationIndex === -1) {
            userUpdate.iterations.push(value);
          } else {
            const iteration = userUpdate.iterations[iterationIndex];
            if (value.answers) {
              const answerIndex = iteration.answers.findIndex((answer) => {
                return answer.questionId === value.answers.questionId;
              });
              if (answerIndex !== -1) {
                iteration.questionsToSkip = updateSkip(
                  iteration.answers[answerIndex].answerOption,
                  value.answers.answerOption,
                  iteration.questionsToSkip
                );
                iteration.answers[answerIndex] = value.answers;
              } else {
                iteration.questionsToSkip = updateSkip(
                  null,
                  value.answers.answerOption,
                  iteration.questionsToSkip
                );
                iteration.answers.push(value.answers);
              }
            } else {
              delete value.answers;
              const nonAnswerEntries = Object.entries(value);
              nonAnswerEntries.forEach((entry) => {
                const nonAnswerKey = entry[0];
                const nonAnswerValue = entry[1];
                iteration[nonAnswerKey] = nonAnswerValue;
              });
            }
          }
        } else {
          console.log('Hereeee', key, value);
          userUpdate[key] = value;
        }
      });

      console.log('----', userUpdate);

      userUpdate
        .save()
        .then(() => {
          return res.status(200).json({
            message: 'User updated!'
          });
        })
        .catch((error) => {
          return res.status(400).json({
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

*/

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUsersById,
  getAnswerById,
  updateUserById2,
  updateIteration,
  updateUserAnswersByIds2,
  // updateUserById,
  resetAdminAnswers
};
