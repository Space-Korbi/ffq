const mongoose = require('mongoose');

const { Schema } = mongoose;

const ScreeningRule = Schema(
  {
    id: { type: String, required: true },
    criteria: { type: [String], required: true },
    operator: { type: String, enum: ['and', 'or'], required: true },
    decision: { type: String, enum: ['accept', 'reject', 'wait'], required: true }
  },
  { _id: false, default: [] }
);

/**
 * * Iteration
 * @param startDate - Date when the Questionnaire is accesible
 * @param endDate - Date when the Questionnaire is no longer accesible
 */

const Iteration = Schema(
  {
    id: { type: String, required: true },
    start: { type: Date },
    startLabel: { type: String },
    end: { type: Date },
    endLabel: { type: String }
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
  new Schema(
    {
      name: { type: String, default: 'New Questionnaire' },
      consentScript: { type: String, default: '' },
      screeningRules: [ScreeningRule],
      selectionCriteria: { type: [String], default: [] },
      iterations: [Iteration],
      questions: { type: [mongoose.Types.ObjectId], default: [] }
    },
    { timestamps: true }
  )
);

module.exports = Questionnaire;
