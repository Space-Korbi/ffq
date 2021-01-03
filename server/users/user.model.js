const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Role'
        }
      ]
    },
    { timestamps: true }
  )
);

module.exports = User;

/*
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
*/
