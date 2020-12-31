/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';

// custom hooks
import useFetchQuestions from '../../hooks';

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
