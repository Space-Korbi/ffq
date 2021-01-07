import {
  getAllUsers,
  getUserById,
  getUsersMetadata,
  // getUsersAccountData,
  getAnswerById,
  updateAnswerById
} from '../api';

const updateAction = {
  updateAnswer: 'updateAnswer',
  updateData: 'updateData',
  resetAnswers: 'resetAnswers'
};

const fetchAllUsers = () => {
  return getAllUsers();
};

const fetchUserById = (userId) => {
  return getUserById(userId);
};

const getMetaData = (userId) => {
  return getUsersMetadata(userId);
};

/* const getAccountData = (userId) => {
  return getUsersAccountData(userId, { headers: authHeader() });
}; */

const fetchAnswersById = (userId, questionId) => {
  return getAnswerById(userId, questionId);
};

const saveAnswer = (userId, questionId, answer, questionIndex) => {
  const payload = { action: updateAction.updateAnswer, answer, questionIndex, questionId };
  return updateAnswerById(userId, payload);
};

const resetAnswers = (userId) => {
  const payload = { action: updateAction.resetAnswers };
  return updateAnswerById(userId, payload);
};

const userService = {
  fetchAllUsers,
  fetchUserById,
  getMetaData,
  // getAccountData,
  fetchAnswersById,
  saveAnswer,
  resetAnswers
};

export default userService;

/* import { authHeader } from '../helpers';
import authenticationService from './authenticationService';

const config = JSON.stringify({
  apiUrl: 'http://localhost:4000'
});

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        authenticationService.logout();
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

const userService = {
  getAll,
  getById
};

export default userService;

*/
