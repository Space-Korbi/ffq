const express = require('express');
const UserCtrl = require('./user.controller');
const { authJwt } = require('../middlewares');

const router = express.Router();

router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.getUsers);
router.get('/users/:userId', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.getUserById);
router.get(
  '/users/:userId/questions/:questionId',
  [authJwt.verifyToken, authJwt.authoriseUser],
  UserCtrl.getAnswerById
);
router.put('/users/:userId', [authJwt.verifyToken, authJwt.authoriseUser], UserCtrl.updateUserById);

module.exports = router;
