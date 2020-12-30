/* eslint-disable no-unused-vars */
const express = require('express');
const ImageCtrl = require('../controllers/image-ctrl');

const router = express.Router();

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/image-ctrl
 */

router.post('/upload', ImageCtrl.upload, ImageCtrl.getImageName);

module.exports = router;
