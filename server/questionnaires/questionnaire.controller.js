const async = require('async');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const Questionnaire = require('./questionnaire.model');
const Question = require('./questions/question.model');
const { deleteImagesOfQuestion } = require('./questions/question.controller');

/**
 * * Questionnaire controller
 * This class contains the functions to
 * create, update, delete and get questionnaire entries
 */

// start refactor

const createQuestionnaire = async (req, res) => {
  new Questionnaire()
    .save()
    .then((questionnaire) => {
      return res.status(201).json({
        questionnaire,
        message: 'Questionnaire created!'
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Questionnaire not created!'
      });
    });
};

const getQuestionnaires = async (req, res) => {
  // console.log(req.query);
  const { questionnaireId } = req.query;
  const { fields } = req.query;

  /*
  console.log('id:', questionnaireId);
  console.log('fields:', fields);
  console.log('body:', req.body);
  */

  const filter = {};
  if (questionnaireId) {
    filter._id = questionnaireId;
  }

  await Questionnaire.find(filter)
    .select(fields)
    .then((questionnaires) => {
      if (!questionnaires || !questionnaires.length) {
        return res
          .status(404)
          .json({ title: 'Questionnaire not found', detail: 'No questionnaire could be found.' });
      }

      return res.status(200).json({ questionnaires });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error, title: 'Internal error.', detail: 'Something went wrong.' });
    });
};

const addQuestion = async (req, res) => {
  const { question } = req;
  const { questionnaireId } = req.params;
  const { index } = req.body;

  Questionnaire.findOne({ _id: questionnaireId })
    .then((questionnaire) => {
      const id = mongoose.Types.ObjectId(question._id);

      const questionnaireUpdate = questionnaire;
      if (!index) {
        questionnaireUpdate.questions.push(id);
      } else {
        questionnaireUpdate.questions.push({
          $each: [id],
          $position: index
        });
      }

      questionnaireUpdate.save().then(() => {
        return res.status(201).json({
          question,
          message: 'Question created!'
        });
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: 'Questionnaire not found!'
      });
    });
};

const updateQuestionnaire = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { questionnaireId } = req.params;
  const { body } = req;

  await Questionnaire.findByIdAndUpdate({ _id: questionnaireId }, body, { new: true })
    .then(() => {
      return res.status(204).send();
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Questionnaire not updated!'
      });
    });
};

const moveQuestion = (req, res) => {
  const { questionnaireId, questionId, position } = req.params;

  Questionnaire.findById(questionnaireId)
    .then((questionnaire) => {
      questionnaire.questions.pull({ _id: questionId });

      questionnaire.questions.push({
        $each: [questionId],
        $position: position
      });

      questionnaire.save().then(() => {
        return res.status(204).send();
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Questionnaire or Question not found!'
      });
    });
};

const removeQuestion = (req, res) => {
  const { questionnaireId, questionId } = req.params;
  Questionnaire.findById(questionnaireId)
    .then((questionnaire) => {
      questionnaire.questions.pull({ _id: questionId });
      questionnaire.save().then(() => {
        return res.status(204).send();
      });
    })

    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Questionnaire or Question not found!'
      });
    });
};

// end refactor

const deleteQuestionnaire = async (req, res) => {
  await Questionnaire.findById({ _id: req.params.id }, (error, questionnaire) => {
    if (error) {
      return res.status(400).json({ success: false, error });
    }

    if (!questionnaire) {
      return res.status(404).json({ success: false, error: `Questionnaire not found` });
    }

    const removeQuestionCalls = [];

    questionnaire.questions.forEach((questionId) => {
      removeQuestionCalls.push((callback) => {
        Question.findById(questionId).then((question) => {
          if (question.answerOptions.type === 'Amount') {
            deleteImagesOfQuestion(question.answerOptions.options);
          }
          Question.findByIdAndDelete(questionId).then((result) => {
            callback(null, result);
          });
        });
      });
    });

    async.parallel(removeQuestionCalls, (error, results) => {
      console.log(error);
    });

    return res.status(200).json({ success: true, data: questionnaire });
  }).catch((error) => console.log(error));

  await Questionnaire.findByIdAndDelete({ _id: req.params.id }, (error, questionnaire) => {
    console.log(error);
  });
};

// GET
// http://localhost:3000/api-docs/#/default/get-questionnaires

module.exports = {
  createQuestionnaire,
  addQuestion,
  updateQuestionnaire,
  deleteQuestionnaire,
  moveQuestion,
  removeQuestion,
  getQuestionnaires
};
