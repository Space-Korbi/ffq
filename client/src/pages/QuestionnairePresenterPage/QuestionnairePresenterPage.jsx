/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchQuestions, useFetchAnswer } from '../../hooks';

// components
import { Question } from '../../components/Question';
import ProgressIndicator from '../../components/ProgressIndicator';

const QuestionnairePresenterPage = ({ questionnaireId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newIndex, setNewIndex] = useState(0);
  const [{ questions, isLoadingQuestions, isError }] = useFetchQuestions(questionnaireId);
  const { userId } = useParams();
  // const [{user, isLoadingUser, isErrorUser}] = useFetchUser(userId)
  // if user last given answer index > current index -> load submitted answer
  // if current index > als last given answer -> nichts laden
  const [{ submittedAnswer, isLoadingAnswers, isErrorAnswers }, setQuestionId] = useFetchAnswer(
    userId
  );

  const lastAnsweredQuestionIndex = 12;
  useEffect(() => {
    if (questions && questions.length && currentIndex <= lastAnsweredQuestionIndex) {
      setQuestionId(questions[newIndex]._id);
    }
  }, [questions, newIndex]);

  useEffect(() => {
    if (!isLoadingAnswers && submittedAnswer) {
      setCurrentIndex(newIndex);
    }
  }, [submittedAnswer, isLoadingAnswers]);

  return (
    <div>
      {isError && <div>Something went wrong ...</div>}
      {isLoadingQuestions || isLoadingAnswers ? (
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
                submittedAnswer={submittedAnswer}
                onSubmitAnswer={() => setNewIndex(currentIndex + 1)}
              />
            </div>
          )}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-bottom questionnaire">
            <div className="d-flex flex-fill align-items-center">
              <button
                type="button"
                className="btn btn btn-light"
                onClick={() => setNewIndex(currentIndex - 1)}
              >
                Zurück
              </button>
              <div className="p-1" />
              <ProgressIndicator currentPosition={currentIndex} length={questions.length} />
              <div className="p-1" />
              <button
                type="button"
                className="btn btn btn-light"
                onClick={() => setNewIndex(currentIndex + 1)}
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
