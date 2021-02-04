import { getUsers, updateUser, updateUserIteration, updateUserIterationAnswer } from '../api';

const fetchUsers = async (userId, iterationId, fields) => {
  const response = await getUsers({ userId, iterationId, fields });
  return response.data.users;
};

const updateUserData = (userId, data) => {
  return updateUser(userId, data).catch((error) => {
    return Promise.reject(error.response);
  });
};

const userService = {
  fetchUsers,
  updateUserData,
  updateUserIteration,
  updateUserIterationAnswer
};

export default userService;
