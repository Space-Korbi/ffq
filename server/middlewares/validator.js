/* eslint-disable prefer-promise-reject-errors */
const { body, check, param } = require('express-validator');
const User = require('../users/user.model');
const Questionnaire = require('../questionnaires/questionnaire.model');

// Maybe body should be escaped

// helpers

/*
const isKeyInSchema = (key, model) => {
  return Object.keys(model).includes(key);
};

const isNotEmpty = (value) => {};

// */

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

      return Object.keys(userModel).includes(entry[0]) && (entry[1] !== null || entry[1] !== '');
    });

    if (!validatedEntries) {
      return Promise.reject('No valid data for update.');
    }

    req.body.validated = validatedEntries;
    delete req.body.data;
    return Promise.resolve(validatedEntries);
  })
];

const resetAnswers = [
  param('userId').notEmpty().withMessage('User ID is required.').bail(),
  body('*').custom((data) => {
    if (data.reset) {
      return Promise.resolve(data.reset);
    }
  })
];

const updateQuestionnaire = [
  param('id').notEmpty().withMessage('Questionnaire ID is required.').bail(),
  body('*').custom((data, { req }) => {
    const entries = Object.entries(data);

    console.log(entries);
    const questionnaireModel = Questionnaire.schema.obj;

    const validatedEntries = entries.filter((entry) => {
      if (entry[0] === 'questions') {
        const answers = entry[1];
        if (!answers || !answers.questionId || !answers.answerOption) {
          return false;
        }
      }

      return (
        Object.keys(questionnaireModel).includes(entry[0]) && (entry[1] !== null || entry[1] !== '')
      );
    });

    if (!validatedEntries) {
      return Promise.reject('No valid data for update');
    }

    req.body.validated = validatedEntries;
    delete req.body.data;
    return Promise.resolve(validatedEntries);
  })
];

module.exports = {
  login,
  signup,
  updateUser,
  resetAnswers,
  updateQuestionnaire
};
