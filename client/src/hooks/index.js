import { useState, useEffect, useReducer } from 'react';
// Services
import { questionnaireService } from '../services';

// Custom question fetching hook
const useFetchQuestions = (initialQuestionnaireId) => {
  const [questionnaireId, setQuestionnaireId] = useState(initialQuestionnaireId);

  const fetchQuestionReducer = (state, action) => {
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
          questions: action.payload
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

  const [state, dispatch] = useReducer(fetchQuestionReducer, {
    questions: [],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const fetchedQuestions = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
          questionnaireId
        );
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: fetchedQuestions });
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
  }, [questionnaireId]);

  return [state, setQuestionnaireId];
};

// Custom answer saving hook
const useSaveAnswer = (userId, questionId) => {
  const [answer, setAnswer] = useState('');

  const saveAnswerReducer = (state, action) => {
    switch (action.type) {
      case 'SAVE_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'SAVE_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          answer: action.payload
        };
      case 'SAVE_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(saveAnswerReducer, {
    answer: [],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const saveAnswer = async () => {
      dispatch({ type: 'SAVE_INIT' });
      try {
        if (answer && questionId) {
          // const savedAnswer = await userService.saveAnswer(userId, questionId, answer);
          console.log('In HOOK', userId, questionId, answer);

          if (!didCancel) {
            dispatch({ type: 'SAVE_SUCCESS', payload: { answer: 'savedAnswer', id: questionId } });
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

export { useFetchQuestions, useSaveAnswer };
