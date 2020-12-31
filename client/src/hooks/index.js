import { useState, useEffect, useReducer } from 'react';
// Services
import { questionnaireService } from '../services';

// Custom question fetching hook
const useFetchQuestions = (initialQuestionnaireId) => {
  const [questionnaireId, setQuestionnaireId] = useState(initialQuestionnaireId);

  const questionFetchReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(questionFetchReducer, {
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

export default useFetchQuestions;
