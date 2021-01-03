const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
  },
  { timestamps: true }
);

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // minimize: true,
  transform(doc, ret) {
    const transformed = ret;
    delete transformed._id;
    delete transformed.hash;
    return transformed;
  }
});

module.exports = mongoose.model('User', schema);
