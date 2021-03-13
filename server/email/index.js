require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log('Access key:', AWS.config.credentials.accessKeyId);
  }
});

/*
const SESConfig = {
  apiVersion: '',
  accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION
};

const params = {
  Source: 'no-reply@hi-ffq.herokuapp.com',
  Destination: {
    ToAddresses: ['baumer.korbinian@gmail.com']
  }
};

*/
