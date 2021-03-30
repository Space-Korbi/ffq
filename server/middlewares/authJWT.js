require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');

const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({
      title: 'No token provided.',
      detail: 'Ensure that a valid access token is included in the request header.'
    });
  }

  jwt.verify(token, process.env.SECRET || 'localDevSecret', (err, decoded) => {
    if (err) {
      return res.status(401).json({
        err,
        title: 'Token could not be verified.',
        detail: 'Ensure that the access token is valid.'
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res
        .status(404)
        .json({ title: 'Not found.', detail: `No user found for provided access-token.` });
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

const authoriseUser = (req, res, next) => {
  console.log('========', req.userId, req.query.userId);

  if (!req.userId || !req.query.userId) {
    // TODO if isAdmin -> next()
  } else if (req.userId !== req.query.userId) {
    return res.status(401).send({
      title: 'User unauthorized.',
      detail: 'You are not authorized to access this resource.'
    });
  }
  next();
};

const authJwt = {
  verifyToken,
  authoriseUser,
  isAdmin
};
module.exports = authJwt;
