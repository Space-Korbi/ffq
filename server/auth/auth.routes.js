// const express = require('express');
const { verifySignUp } = require('../middlewares');
const controller = require('./auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.post(
    '/api/auth/signup',
    [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
    controller.signup
  );

  app.post('/api/auth/login', controller.login);
};
/* const router = express.Router();

router.post(
  '/api/auth/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  AuthCtrl.signup
);

router.post('/api/auth/login', AuthCtrl.login);

module.exports = router; */
