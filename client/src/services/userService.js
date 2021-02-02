import {
  getUsers,
  updateUser2,
  updateIteration,
  updateUserAnswersByIds,
  resetAdminAnswers
} from '../api';

const fetchUsersById = (userId, iterationId, fields) => {
  return getUsers({ userId, iterationId, fields }).then((response) => {
    console.log('Response', response.data.users[0]);
    return response.data.users;
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

const resetAnswers = (userId) => {
  return resetAdminAnswers(userId);
};

const userService = {
  fetchUsersById,
  updateUserData2,
  updateIterationData,
  updateUserAnswers,
  resetAnswers
};

export default userService;
