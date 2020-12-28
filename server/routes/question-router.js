/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/question-ctrl
 */
/**
 * Router-level middleware works in the same way as application-level middleware,
 * except it is bound to an instance of express.Router().
 */

const express = require('express');
const QuestionCtrl = require('../controllers/question-ctrl');

const router = express.Router();

/**
 * This middleware function is mounted on the '/question' path.
 * This code is executed for every POST request on the '/api/question' path
 */
router.post('/questionnaire/:questionnaireId/question', QuestionCtrl.createQuestion);
router.delete('/questionnaire/:questionnaireId/question/:id', QuestionCtrl.deleteQuestion);
router.get('/questionnaire/:questionnaireId/questions', QuestionCtrl.getQuestionsOfQuestionnaire);
router.get('/questions', QuestionCtrl.getQuestions);

module.exports = router;
