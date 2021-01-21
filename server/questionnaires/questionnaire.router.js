const express = require('express');

const QuestionnaireCtrl = require('./questionnaire.controller');
const { authJwt, validate } = require('../middlewares');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/questionnaire-ctrl
 */
const router = express.Router();

router.post(
  '/questionnaires',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionnaireCtrl.createQuestionnaire
);
router.put(
  '/questionnaires/:id',
  [validate.updateQuestionnaire, authJwt.verifyToken, authJwt.isAdmin],
  QuestionnaireCtrl.updateQuestionnaire
);
router.delete(
  '/questionnaires/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  QuestionnaireCtrl.deleteQuestionnaire
);
router.get('/questionnaires/:id', [authJwt.verifyToken], QuestionnaireCtrl.getQuestionnaireById);
router.get('/questionnaires', [authJwt.verifyToken], QuestionnaireCtrl.getQuestionnaires);

module.exports = router;
