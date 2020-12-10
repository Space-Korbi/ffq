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
    questionUUID: { type: String, required: true, unique: true },
    index: { type: Number, required: true, unique: true },
    answerType: { type: String, required: true },
    parenQuestion: { type: String, required: false },
    childQuestion: { type: [String], required: false },
    title: { type: String },
    subtitle1: { type: String },
    subtitle2: { type: String },
    help: { type: String },
    category: { type: String, required: true },
    possibleAnswers: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questions', Question);
