const nanoid = require('nanoid');
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Questionnaire
 * @param _id
 * @param name
 * @param startDate - Date when the Questionnaire is accesible
 * @param endDate - Date when the Questionnaire is no longer accesible
 * @param questions - Array of questions
 */

const Questionnaire = new Schema(
  {
    _id: {
      type: String,
      default: nanoid.nanoid(),
      required: true
    },
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    questions: { type: [String] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questionnaires', Questionnaire);
