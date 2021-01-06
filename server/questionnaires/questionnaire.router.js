const express = require('express');

const QuestionnaireCtrl = require('./questionnaire.controller');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/questionnaire-ctrl
 */
const router = express.Router();

router.post('/questionnaires', QuestionnaireCtrl.createQuestionnaire);
router.put('/questionnaires/:id', QuestionnaireCtrl.updateQuestionnaire);
router.delete('/questionnaires/:id', QuestionnaireCtrl.deleteQuestionnaire);
router.get('/questionnaires/:id', QuestionnaireCtrl.getQuestionnaireById);
router.get('/questionnaires', QuestionnaireCtrl.getQuestionnaires);

module.exports = router;
