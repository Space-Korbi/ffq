import {
  getAllUsers,
  getUsersById,
  getUsersMetadata,
  // getUsersAccountData,
  updateUser,
  getAnswerById,
  updateAnswerById,
  resetAdminAnswers
} from '../api';

const updateAction = {
  updateAnswer: 'updateAnswer',
  updateData: 'updateData',
  resetAnswers: 'resetAnswers'
};

// fetchUsersById and fetchAllUsers can be merged into one function with optional userId parameter
const fetchAllUsers = () => {
  return getAllUsers().then((response) => {
    return response.data.users;
  });
};

const fetchUsersById = (userId) => {
  return getUsersById(userId).then((response) => {
    return response.data.users;
  });
};

const getMetaData = (userId) => {
  return getUsersMetadata(userId);
};

const updateUserData = (userId, data) => {
  return updateUser(userId, data).then((res) => {
    return res.data;
  });
};

const updateUserAnswer = (userId, answers, stoppedAtIndex) => {
  const data = { answers, stoppedAtIndex };
  return updateUser(userId, { data }).then((res) => {
    return res.data;
  });
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
  return resetAdminAnswers(userId);
};

const userService = {
  fetchAllUsers,
  fetchUsersById,
  getMetaData,
  // getAccountData,
  updateUserData,
  updateUserAnswer,
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
