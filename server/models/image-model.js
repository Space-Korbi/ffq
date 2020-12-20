const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * * Image Schema
 * For storing images in the mongodb database
 * @param index - Place in FFQ
 */

const Image = new Schema({
  imageName: { type: String, default: 'none', required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('image', Image);
