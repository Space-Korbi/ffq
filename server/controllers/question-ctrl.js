/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const Question = require('../models/question-model');

/**
 * * Question controller
 * This class contains the functions to
 * create, update, delete and get question entries
 */

const createQuestion = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a question'
    });
  }

  if (!body.index) {
    const count = await Question.countDocuments();
    body.index = count + 1;
  }

  const question = new Question(body);

  if (!question) {
    return res.status(400).json({ success: false, error: err });
  }

  question
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: question._id,
        message: 'Question created!'
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Question not created!'
      });
    });
};

const deleteImages = (imagePaths) => {
  imagePaths.forEach((url) => {
    fs.unlink(url, (err) => {
      if (err) throw err;
      console.log(`${url} was deleted`);
    });
  });
};

const deleteQuestion = async (req, res) => {
  await Question.findById({ _id: req.params.id }, (err, question) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!question) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }

    if (question.answerOptions.type === 'Amount') {
      const imagePaths = question.answerOptions.options.reduce((filtered, option) => {
        if (option.imageURL) {
          const { imageURL } = option;
          filtered.push(imageURL);
        }
        return filtered;
      }, []);
      deleteImages(imagePaths);
    }
    return res.status(200).json({ success: true, data: question });
  }).catch((err) => console.log(err));

  await Question.findByIdAndDelete({ _id: req.params.id }, (err, question) =>
    console.log('Deleted', question)
  );
};

const getQuestions = async (req, res) => {
  await Question.find({}, (err, questions) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!questions.length) {
      return res.status(404).json({ success: false, error: `Question not found` });
    }
    return res.status(200).json({ success: true, data: questions });
  }).catch((err) => console.log(err));
};

module.exports = {
  createQuestion,
  deleteQuestion,
  getQuestions
};
