const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Questionnaire
 * @param id
 * @param name
 * @param startDate - Date when the Questionnaire is accesible
 * @param endDate - Date when the Questionnaire is no longer accesible
 * @param questions - Array of questions
 */

const Questionnaire = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    questions: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questionnaire', Questionnaire);
