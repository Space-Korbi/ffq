/* eslint-disable no-underscore-dangle */
const Questionnaire = require('../models/questionnaire-model');

/**
 * * Questionnaire controller
 * This class contains the functions to
 * create, update, delete and get questionnaire entries
 */
const createQuestionnaire = (req, res) => {
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
        id: questionnaire._id,
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

  Questionnaire.findOne({ _id: req.params.id }, (err, questionnaire) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Questionnaire not found!'
      });
    }
    const questionnaireUpdate = questionnaire;
    questionnaireUpdate.name = body.name;
    questionnaireUpdate.time = body.time;
    questionnaireUpdate.rating = body.rating;
    questionnaireUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: questionnaire._id,
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
  await Questionnaire.findOneAndDelete({ _id: req.params.id }, (err, questionnaire) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!questionnaire) {
      return res.status(404).json({ success: false, error: `Questionnaire not found` });
    }

    return res.status(200).json({ success: true, data: questionnaire });
  }).catch((err) => console.log(err));
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

module.exports = {
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaireById
};
