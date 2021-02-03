import { getUsers, updateUser, updateUserIteration, updateUserIterationAnswer } from '../api';

const fetchUsers = async (userId, iterationId, fields) => {
  const response = await getUsers({ userId, iterationId, fields });
  return response.data.users;
};

const updateUserData = (userId, data) => {
  return updateUser(userId, data);
};

const updateIterationData = (userId, iterationId, data) => {
  return updateUserIteration(userId, iterationId, data);
};

const updateAnswer = (userId, iterationId, questionId, data) => {
  return updateUserIterationAnswer(userId, iterationId, questionId, data);
};

const userService = {
  fetchUsers,
  updateUserData,
  updateIterationData,
  updateAnswer
};

export default userService;
