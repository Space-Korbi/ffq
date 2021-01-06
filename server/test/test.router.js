const express = require('express');
const TestCtrl = require('./test.controller');

const router = express.Router();

router.post('/tests/:testId', TestCtrl.createTest);
router.get('/tests', TestCtrl.getTests);
router.get('/test/:testId', TestCtrl.getTestById);
router.put('/test/:testId', TestCtrl.updateTestById);
router.delete('/test/:testId', TestCtrl.deleteTest);

module.exports = router;
