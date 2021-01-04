const express = require('express');

const QuestionnaireCtrl = require('./questionnaire.controller');

/**
 * * Router
 * This class contains routes for the functions defined in
 * controllers/questionnaire-ctrl
 */
const router = express.Router();

router.post('/questionnaire', QuestionnaireCtrl.createQuestionnaire);
router.put('/questionnaire/:id', QuestionnaireCtrl.updateQuestionnaire);
router.delete('/questionnaire/:id', QuestionnaireCtrl.deleteQuestionnaire);
router.get('/questionnaire/:id', QuestionnaireCtrl.getQuestionnaireById);
router.get('/questionnaires', QuestionnaireCtrl.getQuestionnaires);

module.exports = router;
