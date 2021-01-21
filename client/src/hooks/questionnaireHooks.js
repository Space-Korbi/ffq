import { useEffect, useState, useReducer } from 'react';

// services
import { questionnaireService } from '../services';

// custom question fetching hook
const useFetchQuestionnaires = () => {
  // const [questionnaires, setQuestionnaires] = useState();

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
        const fetchedQuestionnaires = await questionnaireService.fetchAllQuestionnaires();
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: fetchedQuestionnaires });
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
  }, []);

  return [state];
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
        const fetchedQuestions = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
          questionniareId
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
  }, [questionniareId]);

  console.log(state);

  return [state, setQuestionniareId];
};

// Custom data fetching hook
const useFetchQuestionnairesInfo = () => {
  const fetchQuestionReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoadingInfo: true,
          isErrorInfo: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingInfo: false,
          isErrorInfo: false,
          questionnairesInfo: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingInfo: false,
          isErrorInfo: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchQuestionReducer, {
    questionnairesInfo: [],
    isLoadingInfo: false,
    isErrorInfo: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const questionnaires = await questionnaireService.fetchQuestionnaires('info');
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: questionnaires.info });
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
  }, []);

  return [state];
};

export { useFetchQuestionnaires, useFetchQuestions, useFetchQuestionnairesInfo };
