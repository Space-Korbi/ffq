const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Question Schema
 * @param _id
 * @param index - Place in FFQ
 * @param title
 * @param subtitle1
 * @param subtitle2
 * @param help - Message displayed when clicking help icon
 * @param parenQuestion - ID of parent Question
 * @param childQuestion - IDs of child Questions
 * @param answerOptions - All Answers the user can select
 */

const Question = new Schema(
  {
    _id: { type: String, required: true },
    index: { type: Number, required: true },
    title: { type: String },
    subtitle1: { type: String },
    subtitle2: { type: String },
    help: { type: String },
    parentQuestion: { type: String },
    childQuestion: [{ type: String }],
    answerOptions: {
      type: { type: String, required: true },
      options: { type: Schema.Types.Mixed, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
