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
const QuestionCtrl = require('./question.controller');
const { authJwt } = require('../middlewares');

const router = express.Router();

/**
 * This middleware function is mounted on the '/question' path.
 * This code is executed for every POST request on the '/api/question' path
 */
router.post(
  '/questionnaires/:questionnaireId/questions',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionCtrl.createQuestion
);
router.get('/questions', [authJwt.verifyToken], QuestionCtrl.getQuestions);
router.get(
  '/questionnaires/:questionnaireId/questions',
  [authJwt.verifyToken],
  QuestionCtrl.getQuestionsOfQuestionnaire
);
router.put(
  '/questions/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionCtrl.updateQuestionById
);
router.delete(
  '/questionnaires/:questionnaireId/questions/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionCtrl.deleteQuestion
);

module.exports = router;
