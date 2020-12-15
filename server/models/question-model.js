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
    questionId: { type: String, required: true },
    index: { type: Number, required: true },
    title: { type: String },
    subtitle1: { type: String },
    subtitle2: { type: String },
    help: { type: String },
    parentQuestion: { type: String },
    childQuestion: [{ type: String }],
    answerOptions: {
      type: { type: String, required: true },
      frequencyOptions: {
        left: [
          {
            id: { type: String },
            title: { type: String }
          }
        ],
        right: [
          {
            id: { type: String },
            title: { type: String }
          }
        ]
      },
      amountOptions: [
        {
          id: { type: String },
          title: { type: String },
          imageURL: { type: String }
        }
      ],
      userInputOptions: [
        {
          id: { type: String },
          title: { type: String },
          hasNumberInput: { type: Boolean },
          numberInputTitle: { type: String }
        }
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
