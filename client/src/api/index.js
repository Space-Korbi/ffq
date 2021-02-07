/**
 * * What is axios
 * Axios is a lightweight HTTP client based on the XMLHttpRequests service.
 * It is similar to the Fetch API and is used to perform HTTP requests.
 */
import axios from 'axios';
import { authHeader } from '../helpers';

// Creating a new instance of axios with a custom config.
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// Attach access token to every request header
api.interceptors.request.use((request) => {
  request.headers = authHeader();
  return request;
});

// signup/login
export const signup = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/users/signup`, payload);
export const login = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, payload);

// * REFACTORED
// user
export const getUsers = (params) => api.get(`/users`, { params });
export const updateUser = (userId, payload) => api.patch(`users/${userId}`, payload);
export const updateUserIteration = (userId, iterationId, payload) =>
  api.patch(`/users/${userId}/iterations/${iterationId}`, payload);
export const updateUserIterationAnswer = (userId, iterationId, questionId, payload) =>
  api.patch(`/users/${userId}/iterations/${iterationId}/questions/${questionId}`, payload);

// questionnaire
export const createQuestionnaire = (payload) => api.post(`/questionnaires`, payload);

export const insertQuestion = (questionnaireId, payload) =>
  api.post(`/questionnaires/${questionnaireId}/questions`, payload);

export const updateQuestionnaire2 = (questionnaireId, payload) =>
  api.patch(`/questionnaires/${questionnaireId}`, payload);

export const updateQuestion = (questionId, payload) =>
  api.patch(`/questions/${questionId}`, payload);

// * END REFACTORED

// question

export const updateQuestionById = (id, payload) => api.put(`/questions/${id}`, payload);
export const getAllQuestionsOfQuestionnaire = (questionnaireId) =>
  api.get(`/questionnaires/${questionnaireId}/questions`);
export const deleteQuestionById = (questionnaireId, questionId) =>
  api.delete(`/questionnaires/${questionnaireId}/questions/${questionId}`);

// questionnaire

export const updateQuestionnaire = (questionnaireId, payload) =>
  api.put(`/questionnaires/${questionnaireId}`, payload);
export const getQuestionnaires = (params) => {
  return api.get(`/questionnaires`, { params });
};

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
  login,
  createQuestionnaire,
  getUsers,
  updateUser,
  updateQuestionnaire2,
  updateUserIteration,
  updateUserIterationAnswer,
  getAllQuestionsOfQuestionnaire,
  uploadImage
};

export default apis;
