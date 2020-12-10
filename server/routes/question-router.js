const express = require('express');

const QuestionCtrl = require('../controllers/question-ctrl');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/question-ctrl
 */
const router = express.Router();

router.post('/question', QuestionCtrl.createQuestion);
router.get('/questions', QuestionCtrl.getQuestions);

module.exports = router;
