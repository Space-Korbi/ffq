/* eslint-disable prefer-promise-reject-errors */
const { body, check, param } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../users/user.model');
const Questionnaire = require('../questionnaires/questionnaire.model');

// User
const signup = [
  body('firstName').notEmpty().withMessage('First name cannot be empty.'),
  body('lastName').notEmpty().withMessage('Last name cannot be empty.'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  check('email').custom((value) => {
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject('E-mail already in use.');
      }
    });
  }),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.')
];

const login = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.')
];

const updateUser = [
  param('userId').notEmpty().withMessage('User ID is required.').bail(),
  body('oldPassword').if(body('newPassword').exists()).notEmpty(),
  check('oldPassword')
    .optional()
    .custom((value, { req }) => {
      const { userId } = req.params;
      return User.findOne({ _id: userId }).then((user) => {
        const passwordIsValid = bcrypt.compareSync(req.body.oldPassword, user.password);
        if (!passwordIsValid) {
          return Promise.reject('Old Password is incorrect.');
        }
      });
    }),
  body('newPassword')
    .if(body('confirmPassword').exists())
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long.'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("Password doesn't match")
];

module.exports = {
  login,
  signup,
  updateUser
};
