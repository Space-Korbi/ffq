/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';
import { get, findIndex } from 'lodash';
import { userService } from '../../services';

// custom hooks
import { useFetchQuestions, useFetchUsers } from '../../hooks';

// components
import { Question } from '../../components/Question';
import Submit from '../../components/DefaultSegments';
import ProgressIndicator from '../../components/ProgressIndicator';

const QuestionnairePresenterPage = ({ questionnaireId, isAdmin }) => {
  // set inital values
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [answers, setAnswers] = useState([]);

  // get data
  const { userId } = useParams();
  const [{ questions, isLoadingQuestions, isError }] = useFetchQuestions(questionnaireId);
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  useEffect(() => {
    if (get(users, ['0', 'answers'], false)) {
      const user = users[0];
      if (currentIndex < user.stoppedAtIndex) {
        setCurrentIndex(user.stoppedAtIndex + 1);
      }
      setAnswers(user.answers);
    }
  }, [users]);

  useEffect(() => {
    if (currentIndex <= 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [currentIndex]);

  const handleSubmitAnswer = (answer) => {
    setAnswers((prevAnswer) => {
      const newAnswers = prevAnswer;
      const index = findIndex(newAnswers, { questionId: answer.data.questionId });
      if (index > -1) {
        newAnswers[index].answerOption = answer.data.answer;
      } else {
        newAnswers.push({ questionId: answer.data.questionId, answerOption: answer.data.answer });
      }
      return newAnswers;
    });

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      {isLoadingQuestions || isLoadingUsers ? (
        'Loading...'
      ) : (
        <div>
          <div>
            {questions.length && (
              <>
                {currentIndex >= questions.length ? (
                  <Submit />
                ) : (
                  <>
                    <div>
                      <Question
                        id={questions[currentIndex]._id}
                        title={questions[currentIndex].title}
                        subtitle1={questions[currentIndex].subtitle1}
                        subtitle2={questions[currentIndex].subtitle2}
                        help={questions[currentIndex].help}
                        submittedAnswer={answers[currentIndex]}
                        answerOptions={questions[currentIndex].answerOptions}
                        onSubmitAnswer={(answer) => handleSubmitAnswer(answer)}
                        currentIndex={currentIndex}
                        isPreview={isAdmin}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-bottom questionnaire">
            <div className="d-flex flex-fill align-items-center">
              <button
                type="button"
                className="btn btn btn-light"
                disabled={isDisabled}
                onClick={() => setCurrentIndex(currentIndex - 1)}
              >
                Back
              </button>
              <div className="p-1" />
              <ProgressIndicator currentPosition={currentIndex} length={questions.length} />
              <div className="p-1" />
              {isAdmin && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => {
                    userService.resetAnswers(userId).then(setAnswers([]));
                    setCurrentIndex(0);
                  }}
                >
                  Reset answers
                </button>
              )}
              {/* <button
                type="button"
                className="btn btn btn-light"
                onClick={() => setCurrentIndex(currentIndex + 1)}
              >
                Weiter
              </button> */}
            </div>
          </nav>
        </div>
      )}
      {!answers || !questions || (isError && <div>Something went wrong ...</div>)}
    </div>
  );
};

QuestionnairePresenterPage.propTypes = {
  questionnaireId: string.isRequired,
  isAdmin: bool
};

QuestionnairePresenterPage.defaultProps = {
  isAdmin: false
};
export default QuestionnairePresenterPage;
