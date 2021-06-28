const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Question Schema
 * @param _id
 * @param title
 * @param subtitle1
 * @param subtitle2
 * @param help - Message displayed when clicking help icon
 * @param answerOptions - All Answers the user can select
 */

const Question = new Schema(
  {
    title: { type: String, default: '' },
    subtitle1: { type: String, default: '' },
    subtitle2: { type: String, default: '' },
    help: { type: String, default: '' },
    answerOptions: {
      type: { type: String, default: '' },
      isMultipleChoice: { type: Boolean, default: false },
      options: { type: Schema.Types.Mixed, default: [] }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
