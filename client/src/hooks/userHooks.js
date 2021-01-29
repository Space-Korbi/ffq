import { useEffect, useState, useReducer } from 'react';
import { get } from 'lodash';

// services
import { userService } from '../services';

// custom users fetching hook
const useFetchUsers = (userId, queryParam) => {
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
          fetchedUsers = await userService.fetchUsersById(userId, queryParam);
        } else {
          fetchedUsers = await userService.fetchAllUsers();
        }
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

// Custom answer fetching hook
const useFetchAnswer = (userId) => {
  const [questionId, setQuestionId] = useState();

  const fetchAnswerReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isSavingAnswer: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isSavingAnswer: false,
          isError: false,
          submittedAnswer: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isSavingAnswer: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchAnswerReducer, {
    submittedAnswer: {},
    isSavingAnswer: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        if (userId && questionId) {
          const fetchedAnswer = await userService.fetchAnswersById(userId, questionId);
          if (!didCancel) {
            dispatch({ type: 'FETCH_SUCCESS', payload: fetchedAnswer.data.data });
          }
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchQuestions();
    return () => {
      didCancel = true;
    };
  }, [questionId]);

  return [state, setQuestionId];
};

// Update user data
const useUpdateUser = (userId) => {
  const [update, setUpdate] = useState();

  const updateUserReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_INIT':
        return {
          ...state,
          isUpdatingUser: true,
          errorUpdatingUser: false
        };
      case 'UPDATE_SUCCESS':
        return {
          ...state,
          isUpdatingUser: false,
          errorUpdatingUser: false,
          update: action.payload
        };
      case 'UPDATE_FAILURE':
        return {
          ...state,
          isUpdatingUser: false,
          errorUpdatingUser: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(updateUserReducer, {
    update: {},
    isUpdatingUser: false,
    errorUpdatingUser: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'UPDATE_INIT' });
      try {
        if (userId && update) {
          await userService.updateUserData2(userId, update).then(() => {
            if (!didCancel) {
              dispatch({ type: 'UPDATE_SUCCESS', payload: update });
            }
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'UPDATE_FAILURE' });
        }
      }
    };
    fetchQuestions();
    return () => {
      didCancel = true;
    };
  }, [update]);

  return [state, setUpdate];
};

// Custom answer saving hook
const useSaveAnswer = (userId, iterationId, questionId) => {
  const [answer, setAnswer] = useState();

  const saveAnswerReducer = (state, action) => {
    switch (action.type) {
      case 'SAVE_INIT':
        return {
          ...state,
          isSavingAnswer: true,
          errorSavingAnswer: false
        };
      case 'SAVE_SUCCESS':
        return {
          ...state,
          isSavingAnswer: false,
          errorSavingAnswer: false,
          answer: action.payload
        };
      case 'SAVE_FAILURE':
        return {
          ...state,
          isSavingAnswer: false,
          errorSavingAnswer: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(saveAnswerReducer, {
    answer: {},
    isSavingAnswer: false,
    errorSavingAnswer: false
  });

  useEffect(() => {
    let didCancel = false;
    const saveAnswer = async () => {
      dispatch({ type: 'SAVE_INIT' });
      try {
        // TODO: Refactor lodash part
        if (
          get(answer, 'answerOption.id', false) ||
          get(answer, ['answerOption', '0', 'id'], false)
        ) {
          const answers = {
            questionId,
            answerOption: answer.answerOption
          };

          await userService.updateUserAnswers(userId, iterationId, questionId, answers).then(() => {
            if (!didCancel) {
              dispatch({
                type: 'SAVE_SUCCESS',
                payload: answers
              });
            }
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'SAVE_FAILURE' });
        }
      }
    };
    saveAnswer();
    return () => {
      didCancel = true;
    };
  }, [answer]);

  return [state, setAnswer];
};

export { useFetchUsers, useFetchAnswer, useUpdateUser, useSaveAnswer };
