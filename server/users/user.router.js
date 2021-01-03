const express = require('express');
const { authJwt } = require('../middlewares');
const UserCtrl = require('./user.controller');

const router = express.Router();

// router.put('/account/:userId', [authJwt.verifyToken], UserCtrl.updateUserById);
router.get('/users', UserCtrl.getUsers);

module.exports = router;

/*
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/test/all', UserCtrl.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], UserCtrl.userBoard);

  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.adminBoard);
};
*/
