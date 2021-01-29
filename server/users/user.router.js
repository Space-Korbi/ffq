const express = require('express');
const UserCtrl = require('./user.controller');
const { authJwt, validate } = require('../middlewares');

const router = express.Router();

// signup
router.post('/users/signup', validate.signup, UserCtrl.createUser);

// login
router.post('/users/login', validate.login, UserCtrl.loginUser);

// TODO: Refactor into one route with query param
// router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.getUsers);
router.get(
  '/users/:userId/questions/:questionId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.getAnswerById
);

// * refactored
// insert when done [authJwt.verifyToken, authJwt.authoriseUser]
router.get('/users', UserCtrl.getUsersById);

// update user data
router.patch(
  '/users/:userId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.updateUserById2
);

// update users iterations
router.patch('/users/:userId/iterations/:iterationId', UserCtrl.updateIteration);

// update users answers
router.patch(
  '/users/:userId/iterations/:iterationId/questions/:questionId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.updateUserAnswersByIds2
);

// reset admin answers
router.put(
  '/users/:userId/reset',
  [validate.resetAnswers, authJwt.verifyToken, authJwt.isAdmin],
  UserCtrl.resetAdminAnswers
);

// * end refactored

/*
router.put(
  '/users/:userId',
  [validate.updateUser, authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.updateUserById
);

*/

module.exports = router;
