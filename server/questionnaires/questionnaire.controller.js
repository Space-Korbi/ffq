const async = require('async');
const { validationResult } = require('express-validator');
const Questionnaire = require('./questionnaire.model');
const Question = require('../questions/question.model');
const { deleteImagesOfQuestion } = require('../questions/question.controller');

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

const createQuestionnaire = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a questionnaire'
    });
  }

  const questionnaire = new Questionnaire(body);

  if (!questionnaire) {
    return res.status(400).json({ success: false, error: err });
  }

  questionnaire
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        data: questionnaire,
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

const updateQuestionnaire = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
      case updateAction.insert: {
        questionnaireUpdate.questions.push(body.questionId);
        break;
      }
      case updateAction.insertAt: {
        questionnaireUpdate.questions.push({
          $each: [body.questionId],
          $position: body.index
        });
        break;
      }
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
      case updateAction.changeSettings: {
        // sort intervals before saving
        questionnaireUpdate.name = body.settings.name;
        questionnaireUpdate.accessIntervals = body.settings.accessIntervals;
        questionnaireUpdate.consentScript = body.settings.consentScript;
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

const getQuestionnaireById = async (req, res) => {
  await Questionnaire.findOne({ _id: req.params.id }, (err, questionnaire) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!questionnaire) {
      return res.status(404).json({ success: false, error: `Questionnaire not found` });
    }
    return res.status(200).json({ success: true, data: questionnaire });
  }).catch((err) => console.log(err));
};

// GET
// http://localhost:3000/api-docs/#/default/get-questionnaires
const getQuestionnaires = async (req, res) => {
  await Questionnaire.find({}, null, { sort: 'createdAt' }, (err, questionnaires) => {
    if (err) {
      return res.status(400).json({
        error: err,
        title: 'Bad request.',
        detail: 'No questionnaires could fe found.'
      });
    }

    if (questionnaires && !questionnaires.length) {
      return res.status(204).send();
    }

    console.log(req.query);

    if (req.query) {
      if (req.query.param === '_id') {
        const ids = questionnaires.map((questionnaire) => questionnaire._id);
        return res.status(200).json({
          title: 'Questionnaires.',
          detail: 'Ids of all questionnaires.',
          data: ids
        });
      }
      if (req.query.param === 'metaData') {
        const metaData = questionnaires.map((questionnaire) => {
          return {
            id: questionnaire.id,
            name: questionnaire.name,
            consentScript: questionnaire.consentScript,
            accessIntervals: questionnaire.accessIntervals
          };
        });
        console.log(metaData);
        return res.status(200).json({
          title: 'Questionnaires meta data.',
          detail: 'MetaData of all questionnaires.',
          metaData
        });
      }
    }

    return res.status(200).json({
      title: 'All questionnaires.',
      detail: 'Data of all questionnaires.',
      data: questionnaires
    });
  }).catch((err) => console.log(err));
};

module.exports = {
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaireById,
  getQuestionnaires
};
