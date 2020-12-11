const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Question Schema
 * @param questionID
 * @param index - Place in FFQ
 * @param title
 * @param subtitle1
 * @param subtitle2
 * @param help - Message displayed when clicking help icon
 * @param parenQuestion - ID of parent Question
 * @param childQuestion - IDs of child Questions
 * @param possibleAnswers - All Answers the user could have selected
 */

const Question = new Schema(
  {
    questionID: { type: String, required: true },
    index: { type: Number, required: true },
    title: { type: String },
    subtitle1: { type: String },
    subtitle2: { type: String },
    help: { type: String },
    parentQuestion: { type: Schema.Types.ObjectId },
    childQuestion: [{ type: Schema.Types.ObjectId }],
    selectableAnswers: {
      frequency: {
        leftColumn: [
          {
            key: { type: String },
            name: { type: String },
            skip: { type: [String] },
            imageURL: { type: String }
          }
        ],
        rightColumn: [
          {
            key: { type: String },
            name: { type: String },
            skip: { type: [String] },
            imageURL: { type: String }
          }
        ]
      },
      amount: [
        {
          key: { type: String },
          name: { type: String },
          skip: { type: [String] },
          imageURL: { type: String }
        }
      ],
      userInput: {
        key: { type: String },
        options: { type: Schema.Types.Mixed }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
