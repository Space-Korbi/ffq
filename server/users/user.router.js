const express = require('express');
const UserCtrl = require('./user.controller');
const { authJwt, validate } = require('../middlewares');

const router = express.Router();

// signup
router.post('/users/signup', validate.signup, UserCtrl.createUser);

// login
router.post('/users/login', validate.login, UserCtrl.loginUser);

// get users
router.get('/users', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.getUsers);

// update user data
router.patch('/users/:userId', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.updateUser);

// update users iterations
router.patch('/users/:userId/iterations/:iterationId', UserCtrl.updateIteration);

// update users answers
router.patch(
  '/users/:userId/iterations/:iterationId/questions/:questionId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.updateAnswer
);

module.exports = router;
