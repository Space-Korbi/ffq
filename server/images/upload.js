const fs = require('fs');
const AWS = require('aws-sdk');

const uploadFile = (fileName) => {
  // Read content from the file

  const fileContent = fs.readFileSync(fileName);

  const params = {
    Bucket: 'hi-ffq-pictures',
    Key: 'cat.jpg', // File name you want to save as in S3
    Body: fileContent
  };
};
