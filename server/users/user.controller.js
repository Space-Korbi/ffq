const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const config = require('../auth/auth.config');
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
          console.log('----', roles);
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

      const token = jwt.sign({ id: user.id }, config.secret, {
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

      console.log('body', body);
      if (body.reset) {
        userUpdate.answers = [];
        userUpdate.stoppedAtIndex = -1;
        userUpdate.startedOn = undefined;
        userUpdate.finishedOn = undefined;
      } else {
        body.validated.forEach((entry) => {
          const key = entry[0];
          const value = entry[1];
          if (key === 'stoppedAtIndex' && value < user.stoppedAtIndex) {
            return;
          }

          if (key === 'answers') {
            const index = userUpdate.answers.findIndex((answer) => {
              return answer.questionId === value.questionId;
            });
            if (index !== -1) {
              userUpdate.answers[index] = value;
            } else {
              userUpdate.answers.push(value);
            }
          } else {
            userUpdate[key] = value;
          }
        });
      }
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

module.exports = {
  loginUser,
  createUser,
  getUsers,
  getUsersById,
  getAnswerById,
  updateUserById
};

/*
const express = require('express');

const router = express.Router();
const userService = require('./user.service');

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;
*/
