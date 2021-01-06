const fs = require('fs');
const async = require('async');
const Question = require('./question.model');
const Questionnaire = require('../questionnaires/questionnaire.model');

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

const deleteImages = (imageNames) => {
  imageNames.forEach((imageName) => {
    fs.unlink(`uploads/${imageName}`, (err) => {
      if (err) throw err;
    });
  });
};

const deleteImagesOfQuestion = (options) => {
  if (!options || !options.length) {
    return;
  }
  const imageNames = options.reduce((filtered, option) => {
    if (option.imageName) {
      const { imageName } = option;
      filtered.push(imageName);
    }
    return filtered;
  }, []);
  deleteImages(imageNames);
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
      deleteImagesOfQuestion(question.answerOptions.options);
    }
    return res.status(200).json({ success: true, data: question });
  }).catch((err) => console.log(err));

  await Question.findByIdAndDelete({ _id: req.params.id }, (err, question) => {});
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

const getQuestionsOfQuestionnaire = async (req, res) => {
  await Questionnaire.findById(req.params.questionnaireId).then((questionnaire) => {
    const findQuestionCalls = [];

    questionnaire.questions.forEach((questionId) => {
      findQuestionCalls.push((callback) => {
        Question.findById(questionId).then((result) => {
          if (result === null) {
            const placeholder = {
              _id: 'Undefined'
            };
            callback(null, placeholder);
          } else {
            callback(null, result);
          }
        });
      });
    });

    async.parallel(findQuestionCalls, (err, results) => {
      return res.status(200).json({ success: true, data: results });
    });

    /*
    await Promise.all(
      questionnaire.questions.map(async (questionId) => {
        console.log('Im a questionId', questionId);
        await Question.findById(questionId).then((question) => {
          console.log('Question', question);
        });
      })
    ); */
  });
};

const updateQuestionById = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Question.findOne({ _id: req.params.id }, async (err, question) => {
    if (err) {
      return res.status(404).json({
        err
      });
    }

    if (body.answerOptions.type === 'Amount') {
      const removedImages = question.answerOptions.options.filter((prevOption) => {
        let found = false;
        body.answerOptions.options.forEach((updatedOption) => {
          if (prevOption.imageName === updatedOption.imageName) {
            found = true;
          }
        });
        return !found;
      });
      deleteImagesOfQuestion(removedImages);
    }

    const questionUpdate = question;

    questionUpdate.title = body.questionData.title;
    questionUpdate.subtitle1 = body.questionData.subtitle1;
    questionUpdate.subtitle2 = body.questionData.subtitle2;
    questionUpdate.help = body.questionData.help;
    questionUpdate.answerOptions = body.answerOptions;

    questionUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Question updated!'
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Question not updated!'
        });
      });
  });
};

module.exports = {
  createQuestion,
  updateQuestionById,
  deleteQuestion,
  deleteImagesOfQuestion,
  getQuestions,
  getQuestionsOfQuestionnaire
};
