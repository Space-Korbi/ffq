const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Iteration
 * @param startDate - Date when the Questionnaire is accesible
 * @param endDate - Date when the Questionnaire is no longer accesible
 */

const Iteration = Schema(
  {
    id: { type: String },
    start: { type: Date },
    end: { type: Date }
  },
  { default: [] }
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
      iterations: [Iteration],
      questions: { type: [mongoose.Types.ObjectId], default: [] }
    },
    { timestamps: true }
  )
);

module.exports = Questionnaire;
