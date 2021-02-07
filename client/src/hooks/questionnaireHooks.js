import { useEffect, useState, useReducer } from 'react';

// services
import { questionnaireService } from '../services';

// custom question fetching hook
const useFetchQuestionnaires = (questionnaireId, initialFields) => {
  const [fields, setFields] = useState(initialFields);

  const fetchQuestionnairenReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoadingQuestionnaires: true,
          isErrorQuestionnaires: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingQuestionnaires: false,
          isErrorQuestionnaires: false,
          fetchedQuestionnaires: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingQuestionnaires: false,
          isErrorQuestionnaires: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchQuestionnairenReducer, {
    fetchedQuestionnaires: [],
    isLoadingQuestionnaires: false,
    isErrorQuestionnaires: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestionnaires = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const fetchedQuestionnaires = await questionnaireService.getQuestionnaires({
          questionnaireId,
          fields
        });
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: fetchedQuestionnaires.data.questionnaires });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };
    fetchQuestionnaires();
    return () => {
      didCancel = true;
    };
  }, [fields]);

  return [state, setFields];
};

// Custom question fetching hook
const useFetchQuestions = (initialQuestionnaireId) => {
  const [questionniareId, setQuestionniareId] = useState(initialQuestionnaireId);

  const fetchQuestionReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoadingQuestions: true,
          isErrorQuestions: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingQuestions: false,
          isErrorQuestions: false,
          fetchedQuestions: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingQuestions: false,
          isErrorQuestions: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchQuestionReducer, {
    fetchedQuestions: [],
    isLoadingQuestions: false,
    isErrorQuestions: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await questionnaireService.getQuestions(questionniareId);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data.questions });
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
  }, [questionniareId]);

  return [state, setQuestionniareId];
};

export { useFetchQuestionnaires, useFetchQuestions };
