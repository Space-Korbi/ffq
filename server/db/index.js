/**
 * * Mongoose
 * At the time of writing Mongoose is by far the most popular ODM,
 * and is a reasonable choice if you're using MongoDB for your database.
 */
const mongoose = require('mongoose');

// Set up a connection with the database
mongoose
  .connect('mongodb://127.0.0.1:27017/cinema', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
