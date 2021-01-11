import { useState, useEffect, useReducer } from 'react';
import { get } from 'lodash';

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
          isLoadingQuestions: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoadingQuestions: false,
          isError: false,
          questions: action.payload
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoadingQuestions: false,
          isError: true
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(fetchQuestionReducer, {
    questions: [],
    isLoadingQuestions: false,
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
const useSaveAnswer = (userId, questionId) => {
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

          const savedAnswer = await userService.updateUserAnswer(
            userId,
            answers,
            answer.currentIndex
          );

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

export { useFetchQuestions, useFetchAnswer, useSaveAnswer };
