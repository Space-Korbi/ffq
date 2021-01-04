/**
 * * What is axios
 * Axios is a lightweight HTTP client based on the XMLHttpRequests service.
 * It is similar to the Fetch API and is used to perform HTTP requests.
 */
import axios from 'axios';

// Creating a new instance of axios with a custom config.
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// auth
export const signup = (payload) => api.post(`/auth/signup`, payload);
export const signin = (payload) => api.post(`/auth/signin`, payload);

// user
export const getAccountInfoById = (userId, headers) => api.get(`/account/${userId}`, headers);
export const getAllUsers = (headers) => api.get(`/users`, headers);
export const updateAnswerById = (userId, payload) => api.put(`user/${userId}`, payload);

// question
export const insertQuestionAt = (questionnaireId, payload) =>
  api.post(`/questionnaire/${questionnaireId}/question`, payload);
export const getAllQuestions = () => api.get(`/questions`);
export const updateQuestionById = (id, payload) => api.put(`/question/${id}`, payload);
export const getAllQuestionsOfQuestionnaire = (questionnaireId) =>
  api.get(`/questionnaire/${questionnaireId}/questions`);
export const deleteQuestionById = (questionnaireId, questionId) =>
  api.delete(`/questionnaire/${questionnaireId}/question/${questionId}`);

// questionnaire
export const insertQuestionnaire = (payload) => api.post(`/questionnaire`, payload);
export const getAllQuestionnaires = () => api.get(`/questionnaires`);
export const updateQuestionnaire = (questionnaireId, payload) =>
  api.put(`/questionnaire/${questionnaireId}`, payload);
export const deleteQuestionnaireById = (questionnaireId) =>
  api.delete(`/questionnaire/${questionnaireId}`);
export const getQuestionnaireById = (questionnaireId) =>
  api.get(`/questionnaire/${questionnaireId}`);

// image
export const uploadImage = (payload) => api.post(`/upload`, payload);
export const getAllImages = () => api.get(`/images`);
export const deleteImageById = (id) => api.delete(`/image/${id}`);
export const getImageById = (id) => api.get(`/image/${id}`);

const apis = {
  signup,
  signin,
  getAccountInfoById,
  getAllUsers,
  insertQuestionAt,
  getAllQuestions,
  getAllQuestionsOfQuestionnaire,
  insertQuestionnaire,
  uploadImage
};

export default apis;
