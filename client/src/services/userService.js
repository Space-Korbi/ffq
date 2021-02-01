import {
  getAllUsers,
  getUsersById,
  getUsersMetadata,
  // getUsersAccountData,
  updateUser,
  updateUser2,
  updateIteration,
  updateUserAnswersByIds,
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

const fetchUsersById = (userId, iterationId, fields) => {
  return getUsersById({ userId, iterationId, fields }).then((response) => {
    console.log('Response', response.data.users[0]);
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

// refactored api
const updateUserData2 = (userId, data) => {
  return updateUser2(userId, data);
};

const updateIterationData = (userId, iterationId, data) => {
  console.log(userId, iterationId, data);
  return updateIteration(userId, iterationId, data).then((res) => {
    return res.data;
  });
};

const updateUserAnswers = (userId, iterationId, questionId, data) => {
  return updateUserAnswersByIds(userId, iterationId, questionId, data).then((res) => {
    console.log('Server response new:', res);
    return res.data;
  });
};

// end of refactored api

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
  updateUserData2,
  updateIterationData,
  updateUserAnswers,
  // getAccountData,
  updateUserData,
  fetchAnswersById,
  saveAnswer,
  resetAnswers
};

export default userService;
