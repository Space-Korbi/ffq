const User = require('./user.model');

const updateAction = {
  updateAnswer: 'updateAnswer',
  updateData: 'updateData'
};

const getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(404).json({ success: false, error: `No user found` });
    }
    return res.status(200).json({ success: true, data: users });
  }).catch((err) => console.log(err));
};

const getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!user) {
      return res.status(404).json({ success: false, error: `No user found` });
    }

    let returnData;

    if (!req.query) {
      returnData = user;
    } else {
      switch (req.query.resource) {
        case 'metaData':
          returnData = {
            startData: user.startDate,
            endDate: user.endDate,
            stoppedAtIndex: user.stoppedAtIndex
          };
          break;
        default:
          returnData = user;
      }
    }
    console.log(returnData);

    return res.status(200).json({ success: true, data: returnData });
  }).catch((err) => console.log(err));
};

const getAnswerById = async (req, res) => {
  await User.findOne({ _id: req.params.userId }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!'
      });
    }

    if (!user || !user.answers.length) {
      return res.status(404).json({ success: false, error: 'No answers found' });
    }

    const submittedAnswer = user.answers.find(
      ({ questionId }) => questionId === req.params.questionId
    );

    if (!submittedAnswer) {
      return res.status(404).json({ success: false, error: 'No answer found' });
    }

    return res.status(200).json({ success: true, data: submittedAnswer });
  }).catch((err) => console.log(err));
};

const updateUserById = async (req, res) => {
  const { body } = req;

  console.log('---', body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  User.findOne({ _id: req.params.userId }, async (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!'
      });
    }

    const userUpdate = user;

    switch (body.action) {
      case updateAction.updateAnswer: {
        const foundIndex = userUpdate.answers.findIndex(
          (answer) => answer.questionId === body.questionId
        );
        if (foundIndex > -1) {
          userUpdate.answers[foundIndex].answerOption = body.answer;
        } else {
          console.log(body.questionIndex);
          userUpdate.answers.push({ questionId: body.questionId, answerOption: body.answer });
          userUpdate.stoppedAtIndex = body.questionIndex;
        }
        break;
      }
      default:
        break;
    }

    console.log('------ updated answer', userUpdate.answers);

    userUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          questionId: body.questionId,
          answer: body.answer,
          index: body.questionIndex,
          message: 'User updated!'
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'User not updated!'
        });
      });
  });
};

module.exports = {
  getUsers,
  getUserById,
  getAnswerById,
  updateUserById
};

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

/*
const express = require('express');

const router = express.Router();
const userService = require('./user.service');

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;
*/
