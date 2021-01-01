/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { string } from 'prop-types';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchQuestions, useFetchAnswers } from '../../hooks';

// components
import { Question } from '../../components/Question';
import ProgressIndicator from '../../components/ProgressIndicator';

const QuestionnairePresenterPage = ({ questionnaireId }) => {
  const { userId } = useParams();
  const [{ questions, isLoading, isError }] = useFetchQuestions(questionnaireId);
  const [{ answers, isLoadingAnswers, isErrorAnswers }] = useFetchAnswers(questionnaireId, userId);
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
                submittedAnswer={answers[currentIndex]}
                onSubmitAnswer={() => setCurrentIndex(currentIndex + 1)}
              />
            </div>
          )}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-bottom">
            <div className="d-flex flex-fill align-items-center">
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                Zurück
              </button>
              <div className="p-1" />
              <ProgressIndicator currentPosition={currentIndex} length={questions.length} />
              <div className="p-1" />
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                Weiter
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

QuestionnairePresenterPage.propTypes = {
  questionnaireId: string.isRequired
};

export default QuestionnairePresenterPage;
