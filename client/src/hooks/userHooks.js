import { useEffect, useState, useReducer } from 'react';
import { get } from 'lodash';

// services
import { userService } from '../services';

// custom users fetching hook
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
          fetchedUsers = await userService.fetchUsersById(userId);
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
          isLoadingAnswer: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingAnswer: false,
          isError: false,
          submittedAnswer: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingAnswer: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchAnswerReducer, {
    submittedAnswer: {},
    isLoadingAnswer: false,
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

// Custom answer saving hook
const useSaveAnswer = (userId, questionId, iterationId) => {
  const [answer, setAnswer] = useState();

  const saveAnswerReducer = (state, action) => {
    switch (action.type) {
      case 'SAVE_INIT':
        return {
          ...state,
          isLoadingAnswer: true,
          isError: false
        };
      case 'SAVE_SUCCESS':
        return {
          ...state,
          isLoadingAnswer: false,
          isError: false,
          answer: action.payload
        };
      case 'SAVE_FAILURE':
        return {
          ...state,
          isLoadingAnswer: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(saveAnswerReducer, {
    answer: {},
    isLoadingAnswer: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const saveAnswer = async () => {
      dispatch({ type: 'SAVE_INIT' });
      try {
        if (
          get(answer, 'answerOption.id', false) ||
          get(answer, ['answerOption', '0', 'id'], false)
        ) {
          const answers = {
            questionId,
            answerOption: answer.answerOption
          };

          const savedAnswer = await userService.updateUserAnswer(userId, {
            iterations: { iterationId, answers, stoppedAtIndex: answer.currentIndex }
          });

          if (!didCancel) {
            dispatch({
              type: 'SAVE_SUCCESS',
              payload: savedAnswer
            });
          }
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

export { useFetchUsers, useFetchAnswer, useSaveAnswer };
