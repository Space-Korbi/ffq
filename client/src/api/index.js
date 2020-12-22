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

export const insertMovie = (payload) => api.post(`/movie`, payload);
export const getAllMovies = () => api.get(`/movies`);
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload);
export const deleteMovieById = (id) => api.delete(`/movie/${id}`);
export const getMovieById = (id) => api.get(`/movie/${id}`);

export const insertQuestion = (payload) => api.post(`/question`, payload);
export const getAllQuestions = () => api.get(`/questions`);
export const deleteQuestionById = (id) => api.delete(`question/${id}`);

export const uploadImage = (payload) => api.post(`/upload`, payload);
export const getAllImages = () => api.get(`/images`);
export const deleteImageById = (id) => api.delete(`/image/${id}`);
export const getImageById = (id) => api.get(`/image/${id}`);

export const insertQuestionnaire = (payload) => api.post(`/questionnaire`, payload);

const apis = {
  insertMovie,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
  getMovieById,
  insertQuestion,
  getAllQuestions,
  insertQuestionnaire,
  uploadImage
};

export default apis;
