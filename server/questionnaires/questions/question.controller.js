const Question = require('./question.model');
const Images = require('../../images/image.controller');

/**
 * * Question controller
 * This class contains the functions to
 * create, update, delete and get question entries
 */

// refactor start
const createQuestion = async (req, res, next) => {
  const { index } = req.body;
  let title = 'Neue Frage';

  if (index) {
    title = `Frage ${index}`;
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

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion
};
