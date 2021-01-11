/* eslint-disable prefer-promise-reject-errors */
const { body, check, param, validationResult } = require('express-validator');
const User = require('../users/user.model');

// Maybe body should be escaped

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

const update = [
  param('userId').notEmpty().withMessage('User ID is required').bail(),
  body('*').custom((data, { req }) => {
    const entries = Object.entries(data);

    const userModel = User.schema.obj;
    delete userModel.roles;

    const validatedEntries = entries.filter((entry) => {
      if (entry[0] === 'answers') {
        const answers = entry[1];
        if (!answers || !answers.questionId || !answers.answerOption) {
          return false;
        }
      }

      return Object.keys(userModel).includes(entry[0]) && entry[1];
    });

    if (!validatedEntries) {
      return Promise.reject('No valid data for update');
    }

    req.body.validated = validatedEntries;
    delete req.body.data;
    return Promise.resolve(validatedEntries);
  })
];

const reset = [
  param('userId').notEmpty().withMessage('User ID is required').bail(),
  body('*').custom((data) => {
    if (data.reset) {
      return Promise.resolve(data.reset);
    }
  })
];

const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  login,
  signup,
  update,
  reset,
  userValidationRules,
  validate
};
