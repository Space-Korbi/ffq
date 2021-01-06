const mongoose = require('mongoose');

const { Schema } = mongoose;

const Answer = mongoose.Schema(
  {
    questionId: { type: String },
    answerOption: { type: Schema.Types.Mixed }
  },
  { _id: false, default: [] }
);

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      hasAcceptedConsentForm: { type: Boolean, default: false },
      screeningStatus: { type: String, default: '' },
      personalData: [{ type: String, default: [] }],
      screeningData: [{ type: String, default: [] }],
      startDate: { type: Date },
      endDate: { type: Date },
      stoppedAtIndex: { type: Number, default: -1 },
      answers: [Answer],
      roles: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role'
        }
      ]
    },
    { timestamps: true }
  ).set('toJSON', {
    virtuals: true,
    versionKey: false,
    // minimize: true,
    transform(doc, ret) {
      const transformed = ret;
      delete transformed._id;
      delete transformed.password;
      delete transformed.roles;
      return transformed;
    }
  })
);

module.exports = User;
