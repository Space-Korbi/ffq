import {
  insertQuestion,
  getQuestions,
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
  getQuestions,
  moveQuestion,
  deleteQuestion,
  deleteQuestionnaire
};

export default questionnaireService;
