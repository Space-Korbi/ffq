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
export const updateAnswerById = (userId, payload) => api.put(`users/${userId}`, payload);
export const getAccountInfoById = (userId, headers) => api.get(`/accounts/${userId}`, headers);
export const getAllUsers = (headers) => api.get(`/users`, headers);
export const getAnswerById = (userId, questionId, headers) =>
  api.get(`users/${userId}/questions/${questionId}`, headers);

// question
export const insertQuestionAt = (questionnaireId, payload) =>
  api.post(`/questionnaires/${questionnaireId}/questions`, payload);
export const updateQuestionById = (id, payload) => api.put(`/questions/${id}`, payload);
export const getAllQuestions = () => api.get(`/questions`);
export const getAllQuestionsOfQuestionnaire = (questionnaireId) =>
  api.get(`/questionnaires/${questionnaireId}/questions`);
export const deleteQuestionById = (questionnaireId, questionId) =>
  api.delete(`/questionnaires/${questionnaireId}/questions/${questionId}`);

// questionnaire
export const insertQuestionnaire = (payload) => api.post(`/questionnaires`, payload);
export const updateQuestionnaire = (questionnaireId, payload) =>
  api.put(`/questionnaires/${questionnaireId}`, payload);
export const getAllQuestionnaires = () => api.get(`/questionnaires`);
export const getQuestionnaireById = (questionnaireId) =>
  api.get(`/questionnaires/${questionnaireId}`);
export const deleteQuestionnaireById = (questionnaireId) =>
  api.delete(`/questionnaires/${questionnaireId}`);

// image
export const uploadImage = (payload) => api.post(`/upload`, payload);
export const getAllImages = () => api.get(`/images`);
export const getImageById = (id) => api.get(`/image/${id}`);
export const deleteImageById = (id) => api.delete(`/image/${id}`);

const apis = {
  signup,
  signin,
  insertQuestionnaire,
  insertQuestionAt,
  getAccountInfoById,
  getAllUsers,
  getAllQuestions,
  getAllQuestionsOfQuestionnaire,
  uploadImage
};

export default apis;
