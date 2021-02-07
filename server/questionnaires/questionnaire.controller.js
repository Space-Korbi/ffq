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

const updateAction = {
  insert: 'insert',
  insertAt: 'insertAt',
  removeById: 'removeById',
  move: 'move',
  changeSettings: 'changeSettings'
};

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
    .catch((err) => {
      return res
        .status(500)
        .json({ err, title: 'Internal error.', detail: 'Something went wrong.' });
    });
};

const addQuestion = async (req, res) => {
  const { question } = req;
  const { questionnaireId } = req.params;
  const { index } = req.body;

  console.log('-------', req.body);

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
    .catch((err) => {
      return res.status(404).json({
        err,
        message: 'Questionnaire not found!'
      });
    });
};

const updateQuestionnaire2 = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { questionnaireId } = req.params;
  const { body } = req;

  console.log(questionnaireId, '-----', body);

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

// end refactor

const updateQuestionnaire = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log('+++++++++');

  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Questionnaire.findOne({ _id: req.params.id }, async (err, questionnaire) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Questionnaire not found!'
      });
    }

    const questionnaireUpdate = questionnaire;

    switch (body.action) {
      case updateAction.removeById: {
        questionnaire.questions.pull({ _id: body.questionId });
        break;
      }
      case updateAction.move: {
        if (body.toIndex > body.fromIndex) {
          questionnaire.questions.splice(body.fromIndex, 1);
          questionnaire.questions.splice(body.toIndex, 0, body.questionId);
        } else if (body.toIndex < body.fromIndex) {
          questionnaire.questions.splice(body.toIndex, 0, body.questionId);
          questionnaire.questions.splice(body.fromIndex + 1, 1);
        }
        break;
      }

      default:
        break;
    }

    const question = await Question.findById(body.questionId);
    questionnaireUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          questionnaireUpdate,
          success: true,
          id: questionnaire._id,
          question,
          index: body.index,
          message: 'Questionnaire updated!'
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Questionnaire not updated!'
        });
      });
  });
};

const deleteQuestionnaire = async (req, res) => {
  await Questionnaire.findById({ _id: req.params.id }, (err, questionnaire) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
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

    async.parallel(removeQuestionCalls, (err, results) => {
      console.log(err);
    });

    return res.status(200).json({ success: true, data: questionnaire });
  }).catch((err) => console.log(err));

  await Questionnaire.findByIdAndDelete({ _id: req.params.id }, (err, questionnaire) => {
    console.log(err);
  });
};

// GET
// http://localhost:3000/api-docs/#/default/get-questionnaires

module.exports = {
  createQuestionnaire,
  addQuestion,
  updateQuestionnaire2,
  updateQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaires
};
