import { useState, useEffect, useReducer } from 'react';
// Services
import { questionnaireService, userService } from '../services';

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

// Custom answer fetching hook
const useFetchAnswers = (initialQuestionnaireId, userId) => {
  const [questionnaireId, setQuestionnaireId] = useState(initialQuestionnaireId);

  const fetchAnswerReducer = (state, action) => {
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

  const [state, dispatch] = useReducer(fetchAnswerReducer, {
    answers: [
      { questionId: '8PvmWG7k2gSRpgcqZKqqc', answer: { id: 'dFspcp9612x8zmFAFpn7o', value: '4' } },
      { questionId: 'QEqP2bUcGAPWdie05BtH_', answer: { id: 'dOqmYRzFabGWf0rKfH7n8', value: '3' } },
      {
        questionId: 'Abd_YOHjKI6Uj_eW17k_j',
        answers: [
          { id: 't9cns7UD8__LcLZqJ8_Yo', value: 'Hello' },
          { id: '9eyY2SOF1L2scypJ3NoKm', value: 'World' },
          { id: 'GfdGAPliW3Htu6XeGXYlw', value: 'Of Numbers', numberValue: 22 }
        ]
      }
    ],
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const fetchQuestions = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        console.log(userId);
        // const fetchedAnswers = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
        // questionnaireId
        // );
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: 'fetchedAnswers' });
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
    answer: {},
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    const saveAnswer = async () => {
      dispatch({ type: 'SAVE_INIT' });
      try {
        if (answer) {
          const savedAnswer = await userService.saveAnswer(userId, questionId, answer);
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

export { useFetchQuestions, useFetchAnswers, useSaveAnswer };
