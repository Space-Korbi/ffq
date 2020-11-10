const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * * Database Schema
 * @param name - Movie title
 * @param time - Time of screening
 * @param rating - Movie rating
 */
const Movie = new Schema(
  {
    name: { type: String, required: true },
    time: { type: [String], required: true },
    rating: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('movies', Movie);
