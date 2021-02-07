import {
  insertQuestion,
  getAllQuestionsOfQuestionnaire,
  createQuestionnaire,
  getQuestionnaires,
  updateQuestionnaire,
  updateQuestionnaire2,
  updateQuestion,
  deleteQuestionnaireById,
  deleteQuestionById
} from '../api';

const updateAction = {
  insert: 'insert',
  insertAt: 'insertAt',
  removeById: 'removeById',
  move: 'move',
  changeSettings: 'changeSettings'
};
// start refactor

// end refactor

const fetchAllQuestionsOfQuestionnaire = async (questionnaireId) => {
  if (!questionnaireId) {
    return [];
  }
  return getAllQuestionsOfQuestionnaire(questionnaireId).then((response) => {
    return response.data.data;
  });
};

const removeQuestionById = (questionnaireId, questionId) => {
  return deleteQuestionById(questionnaireId, questionId).then(() => {
    const questionnairePayload = {
      action: updateAction.removeById,
      questionId
    };
    return updateQuestionnaire(questionnaireId, questionnairePayload).then((res) => {
      return res.data;
    });
  });
};

const moveQuestionFromTo = async (questionnaireId, questionId, fromIndex, toIndex) => {
  const questionnairePayload = {
    action: updateAction.move,
    questionId,
    fromIndex,
    toIndex
  };
  return updateQuestionnaire(questionnaireId, questionnairePayload).then((res) => {
    return res.data;
  });
};

const updateQuestionnaireSettings = (questionnaireId, settings) => {
  const questionnairePayload = {
    action: updateAction.changeSettings,
    settings
  };
  return updateQuestionnaire(questionnaireId, questionnairePayload).then((res) => {
    return res.data;
  });
};

const deleteQuestionnaire = async (id) => {
  const deletedQuestionnaire = await deleteQuestionnaireById(id);
  return deletedQuestionnaire.data.data;
};
const questionnaireService = {
  createQuestionnaire,
  insertQuestion,
  updateQuestionnaire2,
  updateQuestion,
  getQuestionnaires,
  fetchAllQuestionsOfQuestionnaire,
  moveQuestionFromTo,
  updateQuestionnaireSettings,
  removeQuestionById,
  deleteQuestionnaire
};

export default questionnaireService;
