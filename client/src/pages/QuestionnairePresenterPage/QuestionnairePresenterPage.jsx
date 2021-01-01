/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';

// custom hooks
import { useFetchQuestions } from '../../hooks';

// components
import { Question } from '../../components/Question';

const QuestionnairePresenterPage = ({ questionnaireId }) => {
  const [{ questions, isLoading, isError }] = useFetchQuestions(questionnaireId);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        'Loading...'
      ) : (
        <div>
          {questions.length && (
            <div>
              <Question
                id={questions[currentIndex]._id}
                title={questions[currentIndex].title}
                subtitle1={questions[currentIndex].subtitle1}
                subtitle2={questions[currentIndex].subtitle2}
                help={questions[currentIndex].help}
                answerOptions={questions[currentIndex].answerOptions}
                onSubmitAnswer={() => setCurrentIndex(currentIndex + 1)}
              />
              <button type="button" onClick={() => setCurrentIndex(currentIndex - 1)}>
                Back
              </button>
              <button type="button" onClick={() => setCurrentIndex(currentIndex + 1)}>
                Forward
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

QuestionnairePresenterPage.propTypes = {
  questionnaireId: string.isRequired
};

export default QuestionnairePresenterPage;
