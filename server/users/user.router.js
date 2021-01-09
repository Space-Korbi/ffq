const express = require('express');
const UserCtrl = require('./user.controller');
const { authJwt, validate } = require('../middlewares');

const router = express.Router();

// signup
router.post('/users/signup', validate.signup, UserCtrl.createUser);

// login
router.post('/users/login', validate.login, UserCtrl.loginUser);

router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.getUsers);
router.get('/users/:userId', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.getUserById);
router.get(
  '/users/:userId/questions/:questionId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.getAnswerById
);
router.put('/users/:userId', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.updateUserById);

module.exports = router;
