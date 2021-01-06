const mongoose = require('mongoose');

const Test = new mongoose.Schema(
  {
    title: { type: String },
    number: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model('test', Test);
