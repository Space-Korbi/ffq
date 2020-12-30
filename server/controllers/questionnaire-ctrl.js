/* eslint-disable no-underscore-dangle */
const async = require('async');
const Questionnaire = require('../models/questionnaire-model');
const Question = require('../models/question-model');
const { deleteImagesOfQuestion } = require('./question-ctrl');

/**
 * * Questionnaire controller
 * This class contains the functions to
 * create, update, delete and get questionnaire entries
 */

const updateAction = {
  insert: 'insert',
  insertAt: 'insertAt',
  removeById: 'removeById',
  move: 'move'
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
        console.log('inserting');
        questionnaireUpdate.questions.push(body.questionId);
        break;
      }
      case updateAction.insertAt: {
        console.log('inserting at', body.index);
        questionnaireUpdate.questions.push({
          $each: [body.questionId],
          $position: body.index
        });
        console.log('updated questionnaire', questionnaireUpdate);
        break;
      }
      case updateAction.removeById: {
        console.log('removing by id');
        questionnaire.questions.pull({ _id: body.questionId });
        break;
      }
      case updateAction.move: {
        console.log('moving');
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
    console.log('Found question:', question);

    questionnaireUpdate
      .save()
      .then(() => {
        return res.status(200).json({
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
  console.log('deleting +++++++++', req.params);
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
            console.log('Result', result);
            callback(null, result);
          });
        });
      });
    });

    async.parallel(removeQuestionCalls, (err, results) => {
      console.log('Removed questions: ', results);
    });

    console.log('must delete questionnaire questions here');

    return res.status(200).json({ success: true, data: questionnaire });
  }).catch((err) => console.log(err));

  await Questionnaire.findByIdAndDelete({ _id: req.params.id }, (err, questionnaire) =>
    console.log('Deleted', questionnaire)
  );
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

const getQuestionnaires = async (req, res) => {
  await Questionnaire.find({}, null, { sort: 'createdAt' }, (err, questionnaires) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!questionnaires.length) {
      return res.status(404).json({ success: false, error: `Questionnaire not found` });
    }
    return res.status(200).json({ success: true, data: questionnaires });
  }).catch((err) => console.log(err));
};

module.exports = {
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaireById,
  getQuestionnaires
};
