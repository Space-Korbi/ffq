/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useReducer } from 'react';
import { string } from 'prop-types';

// Services
import { questionnaireService } from '../../services';

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

const QuestionnairePresenterPage = ({ questionnaireId }) => {
  const [{ questions, isLoading, isError }] = useFetchQuestions(questionnaireId);
  console.log(questions);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? 'Loading...' : 'Welcome to QuestionnairePresenterPage'}
    </div>
  );
};

QuestionnairePresenterPage.propTypes = {
  questionnaireId: string.isRequired
};

export default QuestionnairePresenterPage;
