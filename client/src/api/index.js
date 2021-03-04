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

// password reset
export const requestPasswordReset = (payload) =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/users/requestPasswordReset`, payload);
export const resetPassword = (token, password) => {
  const resetApi = axios.create();
  resetApi.interceptors.request.use((request) => {
    request.headers = { 'x-access-token': token };
    return request;
  });

  return resetApi.patch(`${process.env.REACT_APP_BASE_URL}/users/resetPassword`, { password });
};

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

export const getQuestions = (questionnaireId) =>
  api.get(`/questionnaires/${questionnaireId}/questions`);

export const updateQuestionnaire = (questionnaireId, payload) =>
  api.patch(`/questionnaires/${questionnaireId}`, payload);

export const insertQuestion = (questionnaireId, payload) =>
  api.post(`/questionnaires/${questionnaireId}/questions`, payload);

export const updateQuestion = (questionId, payload) =>
  api.patch(`/questions/${questionId}`, payload);

export const moveQuestion = (questionnaireId, questionId, position) =>
  api.patch(`/questionnaires/${questionnaireId}/questions/${questionId}/position/${position}`);

export const deleteQuestion = (questionnaireId, questionId) =>
  api.delete(`/questionnaires/${questionnaireId}/questions/${questionId}`);

// * END REFACTORED

// question

export const updateQuestionById = (id, payload) => api.put(`/questions/${id}`, payload);

// questionnaire

export const getQuestionnaires = (params) => {
  return api.get(`/questionnaires`, { params });
};

export const getQuestionnaireById = (questionnaireId) =>
  api.get(`/questionnaires/${questionnaireId}`);
export const deleteQuestionnaireById = (questionnaireId) =>
  api.delete(`/questionnaires/${questionnaireId}`);

// image
export const uploadImage = (payload) => api.post(`/upload`, payload);

export const uploadImageToCloudinary = (payload) => api.post(`/uploadToCloudinary`, payload);

export const getAllImages = () => api.get(`/images`);
export const getImageById = (id) => api.get(`/image/${id}`);
export const deleteImageById = (id) => api.delete(`/image/${id}`);

const apis = {
  signup,
  login,
  createQuestionnaire,
  getUsers,
  updateUser,
  updateQuestionnaire,
  updateUserIteration,
  updateUserIterationAnswer,
  getQuestions,
  uploadImage
};

export default apis;
