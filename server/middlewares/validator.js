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
        return Promise.reject('Die Email-Addresse wird bereits verwendet');
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
    .withMessage('Email-Addresse eingeben')
    .bail()
    .isEmail()
    .withMessage('Gültige Email-Addresse eingeben'),
  body('password')
    .notEmpty()
    .withMessage('Passwort eingeben')
    .isLength({ min: 5 })
    .withMessage('Passwort muss mindestens 5 Zeichen enthalten')
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
          return Promise.reject('Altes Passwort ist inkorrekt');
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
