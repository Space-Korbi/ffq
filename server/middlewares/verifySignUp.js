const db = require('../helpers/db');

const { ROLES } = db;
const User = db.user;

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({ err, message: 'User not found' });
    }

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: 'Die Email-Adresse wird bereits verwendet' });
    }

    next();
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i += 1) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          success: false,
          message: `Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
