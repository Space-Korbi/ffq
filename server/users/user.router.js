const express = require('express');
const UserCtrl = require('./user.controller');
const { authJwt } = require('../middlewares');

const router = express.Router();

// router.put('/account/:userId', [authJwt.verifyToken], UserCtrl.updateUserById);
router.put('/users/:userId', UserCtrl.updateUserById);
router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.getUsers);
router.get('/users/:userId', [authJwt.verifyToken], UserCtrl.getUserById);

router.get('/users/:userId/questions/:questionId', [authJwt.verifyToken], UserCtrl.getAnswerById);

module.exports = router;
