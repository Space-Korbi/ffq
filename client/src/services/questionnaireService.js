/* eslint-disable no-alert */
import { nanoid } from 'nanoid';
import {
  insertQuestion,
  getAllQuestionsOfQuestionnaire,
  insertQuestionnaire,
  getAllQuestionnaires,
  updateQuestionnaire,
  deleteQuestionnaireById,
  deleteQuestionById
} from '../api';

const updateAction = {
  insert: 'insert',
  insertAt: 'insertAt',
  removeById: 'removeById',
  moveUp: 'moveUp',
  moveDown: 'moveDown'
};

const createQuestionnaire = async () => {
  const payload = {
    _id: nanoid()
  };

  return insertQuestionnaire(payload).then((res) => {
    window.alert(`Questionnaire created successfully`);
    return res.data;
  });
};

const fetchAllQuestionnaires = async () => {
  console.log('fetching questionnaires');

  const questionnaires = await getAllQuestionnaires();
  console.log('fetching questionnaires', questionnaires);
  return questionnaires.data.data;
};

const createQuestionAt = async (questionnaireId, index) => {
  const questionId = nanoid();

  const questionPayload = {
    _id: questionId
  };

  return insertQuestion(questionnaireId, questionPayload).then(async (question) => {
    const questionnairePayload = {
      action: updateAction.insert,
      questionId: question.data.id
    };
    if (index) {
      questionnairePayload.action = updateAction.insertAt;
      questionnairePayload.index = index;
    }
    return updateQuestionnaire(questionnaireId, questionnairePayload).then((res) => {
      window.alert(`Question added successfully at ${index}`);
      return res.data;
    });
  });
};

const removeQuestionById = (questionnaireId, questionId) => {
  console.log('id', questionId);

  return deleteQuestionById(questionnaireId, questionId).then((response) => {
    console.log('response', response);
    const questionnairePayload = {
      action: updateAction.removeById,
      questionId
    };
    return updateQuestionnaire(questionnaireId, questionnairePayload).then((res) => {
      return res.data;
    });
  });
};

// const moveQuestionTo = async (questionnaireId, questionId, index) => {};

const fetchAllQuestionsOfQuestionnaire = async (questionnaireId) => {
  if (!questionnaireId) {
    return [];
  }

  const questions = await getAllQuestionsOfQuestionnaire(questionnaireId);
  return questions.data.data;
};

const deleteQuestionnaire = async (id) => {
  const deletedQuestionnaire = await deleteQuestionnaireById(id);
  return deletedQuestionnaire.data.data;
};
const questionnaireService = {
  createQuestionnaire,
  createQuestionAt,
  fetchAllQuestionnaires,
  fetchAllQuestionsOfQuestionnaire,
  removeQuestionById,
  deleteQuestionnaire
};

export default questionnaireService;
