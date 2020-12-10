const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Question Schema
 * @param uuid
 * @param name
 * @param startDate - Date when the FFQ is accesible
 * @param endDate - Date when the FFQ is no longer accesible
 * @param questions - questions in the ffq
 */

const FFQ = new Schema(
  {
    uuid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    questions: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ffq', FFQ);
