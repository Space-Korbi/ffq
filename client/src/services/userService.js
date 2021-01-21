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

const updateUserAnswer = (userId, data) => {
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
