const express = require('express');

const QuestionnaireCtrl = require('./questionnaire.controller');
const QuestionCtrl = require('./questions/question.controller');
const { authJwt, validate } = require('../middlewares');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/questionnaire-ctrl
 */
const router = express.Router();

// start refactoring

// create questionnaire
router.post(
  '/questionnaires',
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  QuestionnaireCtrl.createQuestionnaire
);

// create question
router.post(
  '/questionnaires/:questionnaireId/questions',
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  [QuestionCtrl.createQuestion, QuestionnaireCtrl.addQuestion]
);

router.get('/questionnaires', /* [authJwt.verifyToken], */ QuestionnaireCtrl.getQuestionnaires);

router.get(
  '/questionnaires/:questionnaireId/questions',
  /* [authJwt.verifyToken], */
  QuestionCtrl.getQuestionsOfQuestionnaire
);

// update questionnaire
router.patch(
  '/questionnaires/:questionnaireId',
  /* [authJwt.verifyToken], */ QuestionnaireCtrl.updateQuestionnaire2
);

// update question
router.patch(
  '/questions/:questionId',
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  QuestionCtrl.updateQuestion
);

router.delete(
  '/questionnaires/:questionnaireId/questions/:questionId',
  /* [authJwt.verifyToken, authJwt.isAdmin], */
  [QuestionCtrl.deleteQuestion, QuestionnaireCtrl.removeQuestion]
);

// end refactoring

router.put(
  '/questionnaires/:id',
  [validate.updateQuestionnaire, authJwt.verifyToken, authJwt.isAdmin],
  QuestionnaireCtrl.updateQuestionnaire
);

router.put(
  '/questions/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionCtrl.updateQuestionById
);

module.exports = router;
