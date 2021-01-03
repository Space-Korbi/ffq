// const express = require('express');
const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/test/all', controller.allAccess);

  app.get('/api/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};

/*
 const router = express.Router();

router.get('/api/test/all', UserCtrl.allAccess);

router.get('/api/test/user', [authJwt.verifyToken], UserCtrl.userBoard);

router.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], UserCtrl.adminBoard);

module.exports = router; */
