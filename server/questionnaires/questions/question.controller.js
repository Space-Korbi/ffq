const async = require('async');
const Question = require('./question.model');
const Questionnaire = require('../questionnaire.model');
const Images = require('../../images/image.controller');

/**
 * * Question controller
 * This class contains the functions to
 * create, update, delete and get question entries
 */

// refactor start
const createQuestion = async (req, res, next) => {
  const { index } = req.body;
  let title = 'New Question';

  if (index) {
    title = `Question ${index}`;
  }

  new Question({ title })
    .save()
    .then((question) => {
      req.question = question;
      return next();
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Question not created!'
      });
    });
};

const updateQuestion = async (req, res, next) => {
  const { questionId } = req.params;
  const { body } = req;

  Question.findByIdAndUpdate(questionId, body)
    .then((question) => {
      // TODO: Test image removal
      if (body.answerOptions && body.answerOptions.type === 'Amount') {
        const removedImages = question.answerOptions.options.filter((prevOption) => {
          let found = false;
          body.answerOptions.options.forEach((updatedOption) => {
            if (prevOption.imageName === updatedOption.imageName) {
              found = true;
            }
          });
          return !found;
        });
        Images.deleteImagesOfQuestion(removedImages);
      }
    })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: 'Question not updated!'
      });
    });
};

const deleteQuestion = async (req, res, next) => {
  const { questionId } = req.params;

  await Question.findByIdAndDelete(questionId)
    .then((question) => {
      // Todo: Check if images are removed
      if (question.answerOptions.type === 'Amount') {
        Images.deleteImagesOfQuestion(question.answerOptions.options);
      }
      next();
    })
    .catch((error) => {
      return res.status(404).json({ error, message: 'Question not found!' });
    });
};

// refactor end

const getQuestionsOfQuestionnaire = async (req, res) => {
  await Questionnaire.findById(req.params.questionnaireId, (err, questionnaire) => {
    if (err) {
      return res.status(404).json({ success: false, error: err });
    }

    if (!questionnaire || !questionnaire.questions) {
      return res.status(404).json({ success: false, error: `No questions found` });
    }

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
      Images.deleteImagesOfQuestion(removedImages);
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
          question: questionUpdate,
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
  updateQuestion,
  updateQuestionById,
  deleteQuestion,
  getQuestionsOfQuestionnaire
};
