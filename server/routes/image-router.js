const express = require('express');

const ImageCtrl = require('../controllers/image-ctrl');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/image-ctrl
 */
const router = express.Router();

router.post('/image', ImageCtrl.createQuestion);
router.get('/images', ImageCtrl.getQuestions);

module.exports = router;
