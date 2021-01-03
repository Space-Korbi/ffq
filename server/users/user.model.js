const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      hasAcceptedConsentForm: { type: Boolean, default: false },
      screeningStatus: { type: Boolean, default: true },
      personalData: [{ type: String }],
      screeningData: [{ type: String }],
      questionnaire: { type: mongoose.Schema.Types.Mixed },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
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
