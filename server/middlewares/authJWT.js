const jwt = require('jsonwebtoken');
const config = require('../auth/auth.config');
const db = require('../helpers/db');

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({
      message: 'No token provided!',
      details: 'Ensure that a valid access token is inlcuded in the request header'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        err,
        message: 'Token could not be verified',
        details: 'Ensure that the access token is valid'
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const authoriseUser = (req, res, next) => {
  if (req.userId !== req.params.userId) {
    return res.status(401).send({
      message: 'Unauthorized',
      details: 'You are not authorized to access this resource'
    });
  }
  next();
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i += 1) {
          if (roles[i].name === 'admin') {
            next();
            return;
          }
        }

        res.status(403).send({ message: 'Require Admin Role!' });
      }
    );
  });
};

const authJwt = {
  verifyToken,
  authoriseUser,
  isAdmin
};
module.exports = authJwt;
