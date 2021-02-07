import {
  insertQuestion,
  getAllQuestionsOfQuestionnaire,
  createQuestionnaire,
  getQuestionnaires,
  updateQuestionnaire,
  updateQuestion,
  deleteQuestionnaireById,
  deleteQuestion,
  moveQuestion
} from '../api';

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

const deleteQuestionnaire = async (id) => {
  const deletedQuestionnaire = await deleteQuestionnaireById(id);
  return deletedQuestionnaire.data.data;
};
const questionnaireService = {
  createQuestionnaire,
  insertQuestion,
  updateQuestionnaire,
  updateQuestion,
  getQuestionnaires,
  fetchAllQuestionsOfQuestionnaire,
  moveQuestion,
  deleteQuestion,
  deleteQuestionnaire
};

export default questionnaireService;
