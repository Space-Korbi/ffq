const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Question Schema
 * @param uuid
 * @param index - Place in FFQ
 * @param answerType - One of the three main answer types (Frequency, Amount or User Input)
 * @param parenQuestion - UUID of parent Question
 * @param childQuestion - UUID of child Questions
 * @param isAnswered - Weather or not the question was answered
 * @param possibleAnswers - All Answers the user could have selected
 * @param answer - The answer the user has given
 */

const Question = new Schema(
  {
    questionUUID: { type: String, required: true },
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
            name: { type: String },
            type: { type: String },
            skip: { type: [String] },
            imageURL: { type: String }
          }
        ],
        rightColumn: [
          {
            name: { type: String },
            type: { type: String },
            skip: { type: [String] },
            imageURL: { type: String }
          }
        ]
      },
      amount: [
        {
          name: { type: String },
          type: { type: String },
          skip: { type: [String] },
          imageURL: { type: String }
        }
      ],
      userInput: {
        options: { type: Schema.Types.Mixed }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
