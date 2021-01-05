import { useEffect, useReducer } from 'react';
// Services
import { userService } from '../services';

// Custom question fetching hook
const useFetchUsers = (userId) => {
  const fetchUserReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoadingUsers: true,
          isErrorUsers: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingUsers: false,
          isErrorUsers: false,
          users: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingUsers: false,
          isErrorUsers: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchUserReducer, {
    users: [],
    isLoadingUsers: false,
    isErrorUsers: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchUsers = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        let fetchedUsers;
        if (userId) {
          fetchedUsers = await userService.fetchUserById(userId);
        } else {
          fetchedUsers = await userService.fetchAllUsers();
        }
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: fetchedUsers.data.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchUsers();
    return () => {
      didCancel = true;
    };
  }, []);

  return [state];
};

export default useFetchUsers;
