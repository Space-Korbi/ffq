require('dotenv').config();
const AWS = require('aws-sdk');

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

  newUser.save((error, user) => {
    if (error) {
      return res.status(500).json({ error, title: 'User was not saved.' });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (error, roles) => {
          if (error) {
            return res.status(500).json({ error, message: 'Role not found' });
          }

          user.roles = roles.map((role) => role._id);
          user.save((error) => {
            if (error) {
              return res
                .status(500)
                .json({ error, message: 'Nutzer konnte nicht registriert werden.' });
            }

            return res
              .status(201)
              .json({ success: true, message: 'Nutzer erfolgreich registriert.' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (error, role) => {
        if (error) {
          return res.status(404).json({ error, message: 'Role not found' });
        }

        user.roles = [role._id];
        user.save((error) => {
          if (error) {
            return res.status(500).json({ error, message: 'User was not saved' });
          }

          return res.json({ success: true, message: 'Nutzer erfolgreich registriert.' });
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
    .exec((error, user) => {
      if (error) {
        return res.status(500).json({
          error,
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
          title: 'Passwort ungültig',
          detail: 'Passwort ungültig'
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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  User.findOne({
    email
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET || 'localDevSecret', {
        expiresIn: '2h'
      });

      // Create sendEmail params
      const params = {
        Destination: {
          /* required */
          ToAddresses: ['korbinian.baumer@web.de']
        },
        Message: {
          /* required */
          Body: {
            /* required */
            Html: {
              Charset: 'UTF-8',
              Data: `<p> Klicken Sie auf den Link oder kopieren Sie ihn in einen Browser um ihr Passwort zurückzusetzen. Falls Sie diese Email vor mehr als zwei Stunden erhalten haben, müssen Sie einen neuen Link anfordern.<br /><br /> <a href="localhost:8000/passwordreset/${token}"> localhost:8000/passwordreset/${token} </a> </p>`
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Test email'
          }
        },
        Source: 'hiffq.app@gmail.com',
        ReplyToAddresses: ['hiffq.app@gmail.com']
      };

      const SESConfig = {
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
        region: process.env.AWS_SES_REGION
      };

      // Create the promise and SES service object
      const sendPromise = new AWS.SES(SESConfig).sendEmail(params).promise();

      // Handle promise's fulfilled/rejected states
      sendPromise
        .then(function (data) {
          console.log(data.MessageId);
          return res.status(204).send();
        })
        .catch(function (err) {
          console.error(err, err.stack);
          return res.status(500).json(err);
        });
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const resetPassword = async (req, res) => {
  const { userId } = req;
  const { password } = req.body;

  const filter = { _id: userId };
  const update = { password: bcrypt.hashSync(password, 8) };

  User.findOneAndUpdate(filter, update)
    .then(() => {
      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

const getUsers = async (req, res) => {
  const { userId, iterationId } = req.query;
  let { fields } = req.query;

  const filter = {};
  if (userId) {
    filter._id = userId;
  }

  if (fields && iterationId) {
    fields = `${fields} iterations.id`;
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
            if (!iteration.id) {
              return false;
            }
            return iteration.id === iterationId;
          });
        }

        return result;
      });

      return res.status(200).json({ users: results });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error, title: 'Internal error.', detail: 'Something went wrong.' });
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req.params;
  const { body } = req;
  const { newPassword } = req.body;

  const fields = { ...body };

  if (newPassword) {
    fields.password = bcrypt.hashSync(newPassword, 8);
  }

  await User.findByIdAndUpdate({ _id: userId }, fields, { new: true })
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
    'iterations.id': iterationId
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
    arrayFilters: [{ 'iteration.id': iterationId }],
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
        { $push: { iterations: { id: iterationId, startedAt: body.startedAt } } }
      )
        .then(() => {
          // if the uuid is created by the server instead, we need to return the id and object here
          return res.status(201).send();
        })
        .catch((error) => {
          return res.status(400).json({
            error,
            message: 'Iteration not updated!'
          });
        });
    });
};

const updateAnswer = async (req, res) => {
  const { userId, iterationId, questionId } = req.params;
  const { answerOption } = req.body;

  await User.findById(userId)
    .then((user) => {
      const userUpdate = user;

      if (!userUpdate.iterations || !userUpdate.iterations.length) {
        userUpdate.iterations.push({ id: iterationId });
      }
      const iteration = userUpdate.iterations.find((i) => {
        return i.id === iterationId;
      });

      let answer;
      if (iteration.answers && iteration.answers.length) {
        answer = iteration.answers.find((a) => {
          return a.questionId === questionId;
        });
      }
      if (answer) {
        iteration.questionsToSkip = updateSkip(
          answer.answerOption,
          answerOption,
          iteration.questionsToSkip
        );
        answer.answerOption = answerOption;

        answer.updatedAt = Date.now();
        console.log('Answer:', answer);
      } else {
        iteration.questionsToSkip = updateSkip(null, answerOption, iteration.questionsToSkip);
        iteration.answers.push({ questionId, answerOption, createdAt: Date.now() });
      }

      userUpdate.save().then(() => {
        return res.status(204).send();
      });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error, title: 'Internal error', detail: 'Answer was not saved or updated.' });
    });
};

module.exports = {
  loginUser,
  createUser,
  requestPasswordReset,
  resetPassword,
  getUsers,
  updateUser,
  updateIteration,
  updateAnswer
};
