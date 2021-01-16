const nanoid = require('nanoid');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const accessInterval = Schema(
  {
    id: { type: String },
    start: { type: Date },
    end: { type: Date }
  },
  { _id: false, default: [] }
);

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
    name: { type: String, default: 'New Questionnaire' },
    accessIntervals: { type: [accessInterval] },
    endDate: { type: [Date] },
    questions: { type: [String] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('questionnaires', Questionnaire);
