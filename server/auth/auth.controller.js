const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./auth.config');
const db = require('../helpers/db');

const User = db.user;
const Role = db.role;

exports.signup = (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    answers: req.body.answers,
    hasAcceptedConsentForm: req.body.hasAcceptedConsentForm,
    screeningStatus: req.body.screeningStatus,
    stoppedAtIndex: req.body.stoppedAtIndex
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).json({ err, message: 'User was not saved' });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            return res.status(500).json({ err, message: 'Role not found' });
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return res.status(500).json({ err, message: 'User was not saved' });
            }

            return res.status(201).json({ success: true, message: 'User registered successfully' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return res.status(404).json({ err, message: 'Role not found' });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).json({ err, message: 'User was not saved' });
          }

          return res.json({ success: true, message: 'User was registered successfully!' });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  console.log('+++++++', req.body);

  User.findOne({
    email: req.body.email
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          err,
          message: 'Something went wrong'
        });
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          success: false,
          message: 'Invalid Username or Password '
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      const authorities = [];

      for (let i = 0; i < user.roles.length; i += 1) {
        authorities.push(`ROLE_${user.roles[i].name.toUpperCase()}`);
      }
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token,
        success: true
      });
    });
};
