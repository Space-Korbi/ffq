/* eslint-disable no-underscore-dangle */
const FFQ = require('../models/ffq-model');

/**
 * * FFQ controller
 * This class contains the functions to
 * create, update, delete and get ffq entries
 */
const createFFQ = (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a ffq'
    });
  }

  const ffq = new FFQ(body);

  if (!ffq) {
    return res.status(400).json({ success: false, error: err });
  }

  ffq
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: ffq._id,
        message: 'FFQ created!'
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'FFQ not created!'
      });
    });
};

const updateFFQ = async (req, res) => {
  const { body } = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  FFQ.findOne({ _id: req.params.id }, (err, ffq) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'FFQ not found!'
      });
    }
    const ffqUpdate = ffq;
    ffqUpdate.name = body.name;
    ffqUpdate.time = body.time;
    ffqUpdate.rating = body.rating;
    ffqUpdate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: ffq._id,
          message: 'FFQ updated!'
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'FFQ not updated!'
        });
      });
  });
};

const deleteFFQ = async (req, res) => {
  await FFQ.findOneAndDelete({ _id: req.params.id }, (err, ffq) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!ffq) {
      return res.status(404).json({ success: false, error: `FFQ not found` });
    }

    return res.status(200).json({ success: true, data: ffq });
  }).catch((err) => console.log(err));
};

const getFFQById = async (req, res) => {
  await FFQ.findOne({ _id: req.params.id }, (err, ffq) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!ffq) {
      return res.status(404).json({ success: false, error: `FFQ not found` });
    }
    return res.status(200).json({ success: true, data: ffq });
  }).catch((err) => console.log(err));
};

module.exports = {
  createFFQ,
  updateFFQ,
  deleteFFQ,
  getFFQById
};
