import {
  getUsers,
  updateUser,
  updateUserIteration,
  updateUserIterationAnswer,
  resetAdminAnswers
} from '../api';

const fetchUsers = async (userId, iterationId, fields) => {
  const response = await getUsers({ userId, iterationId, fields });
  return response.data.users;
};

const updateUserData = (userId, data) => {
  return updateUser(userId, data);
};

const updateIterationData = async (userId, iterationId, data) => {
  const res = await updateUserIteration(userId, iterationId, data);
  return res.data;
};

const updateAnswer = async (userId, iterationId, questionId, data) => {
  const res = await updateUserIterationAnswer(userId, iterationId, questionId, data);
  return res.data;
};

const resetAnswers = (userId) => {
  return resetAdminAnswers(userId);
};

const userService = {
  fetchUsers,
  updateUserData,
  updateIterationData,
  updateAnswer,
  resetAnswers
};

export default userService;
