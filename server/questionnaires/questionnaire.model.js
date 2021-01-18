const nanoid = require('nanoid');
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Access Interval
 * @param startDate - Date when the Questionnaire is accesible
 * @param endDate - Date when the Questionnaire is no longer accesible
 */

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
 * @param accessIntervals
 * @param questions - Array of questions
 */

const Questionnaire = mongoose.model(
  'Questionnaire',
  new mongoose.Schema(
    {
      _id: {
        type: String,
        default: nanoid.nanoid(),
        required: true
      },
      name: { type: String, default: 'New Questionnaire' },
      consentScript: { type: String },
      accessIntervals: { type: [accessInterval] },
      questions: { type: [String] }
    },
    { timestamps: true }
  )
);

module.exports = Questionnaire;
