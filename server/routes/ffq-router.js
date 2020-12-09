const express = require('express');

const FFQCtrl = require('../controllers/ffq-ctrl');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/ffq-ctrl
 */
const router = express.Router();

router.post('/ffq', FFQCtrl.createFFQ);
router.put('/ffq/:id', FFQCtrl.updateFFQ);
router.delete('/ffq/:id', FFQCtrl.deleteFFQ);
router.get('/ffq/:id', FFQCtrl.getFFQById);

module.exports = router;
