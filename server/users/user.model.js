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
      email: { type: String, unique: true, lowercase: true, required: true },
      password: { type: String, required: true },
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      hasAcceptedConsentForm: { type: Boolean, default: false },
      personalData: { type: Schema.Types.Mixed, default: {} },
      screeningData: { type: Schema.Types.Mixed, default: {} },
      screeningStatus: { type: String, enum: ['accept', 'reject', 'wait'], default: 'accept' },
      startedOn: { type: Date },
      finishedOn: { type: Date },
      stoppedAtIndex: { type: Number, default: -1 },
      answers: [Answer],
      questionsToSkip: { type: [String], _id: false, default: [] },
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
    // minimize: false,
    transform(doc, ret) {
      const transformed = ret;
      delete transformed._id;
      delete transformed.password;
      delete transformed.roles;
      delete transformed.createdAt;
      delete transformed.updatedAt;
      return transformed;
    }
  })
);

module.exports = User;
