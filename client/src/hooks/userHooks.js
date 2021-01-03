import { useEffect, useReducer } from 'react';
// Services
import { userService } from '../services';

// Custom question fetching hook
const useFetchUsers = () => {
  const fetchUserReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          users: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchUserReducer, {
    users: [],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchUsers = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const fetchedUsers = await userService.fetchAllUsers();
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: fetchedUsers });
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
