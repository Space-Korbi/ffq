/* eslint-disable no-unused-vars */
require('dotenv').config();

const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const ImageCtrl = require('./image.controller');

const router = express.Router();
const fileUpload = multer();

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/image-ctrl
 */

router.post('/upload', ImageCtrl.upload, ImageCtrl.getImageName);
// router.post('/uploadToCloudinary', fileUpload.single('image'), ImageCtrl.uploadToCloudinary);

router.post('/uploadToCloudinary', fileUpload.single('image'), [
  function (req, res, next) {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      await streamUpload(req)
        .then((result) => {
          console.log('-------', result);
          req.url = result.secure_url;
          next();
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).json({ error });
        });
    }

    upload(req);
  },
  ImageCtrl.getImageURL
]);

module.exports = router;
