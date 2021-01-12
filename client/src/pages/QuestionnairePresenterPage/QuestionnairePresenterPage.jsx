/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { bool, string } from 'prop-types';
import { useParams } from 'react-router-dom';
import { findIndex } from 'lodash';
import { userService } from '../../services';

// custom hooks
import { useFetchQuestions, useFetchUsers } from '../../hooks';

// components
import { Question } from '../../components/Question';
import Submit from '../../components/DefaultSegments';
import ProgressIndicator from '../../components/ProgressIndicator';

const QuestionnairePresenter = ({
  questions,
  previousAnswers,
  questionsToSkip,
  stoppedAtIndex,
  isAdmin
}) => {
  // set inital values
  const [isDisabled, setIsDisabled] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [toSkip, setToSkip] = useState(questionsToSkip);
  const { userId } = useParams();
  const answersRef = useRef(answers);

  useEffect(() => {
    if (!previousAnswers || !previousAnswers.length) {
      const initalAnswers = new Array(questions.length);
      setAnswers(initalAnswers);
    } else {
      const initalAnswers = new Array(questions.length).fill(null);
      previousAnswers.forEach((answer) => {
        const index = questions.findIndex((question) => {
          return question._id === answer.questionId;
        });
        initalAnswers[index] = answer;
      });
      setAnswers(initalAnswers);
    }
  }, []);

  const willSkipQuestionAt = (index) => {
    if (questions && questions[index] && toSkip.includes(questions[index]._id)) {
      return true;
    }
    return false;
  };

  // Recursevly looking for the next Question that wont be skipped
  const nextUnskippedQuestionAt = (index) => {
    const newIndex = index;
    if (willSkipQuestionAt(index)) {
      return nextUnskippedQuestionAt(newIndex + 1);
    }
    return newIndex;
  };

  const [currentIndex, setCurrentIndex] = useState(() => nextUnskippedQuestionAt(stoppedAtIndex));

  useEffect(() => {
    answersRef.current = answers;

    if (answers && answers.length && answers[0]) {
      const nextQuestionIndex = nextUnskippedQuestionAt(currentIndex + 1);
      setCurrentIndex(nextQuestionIndex);
    }
  }, [answers]);

  useEffect(() => {
    if (currentIndex <= 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [currentIndex]);

  const prevUnskippedQuestionAt = (index) => {
    const newIndex = index;
    if (willSkipQuestionAt(index)) {
      return prevUnskippedQuestionAt(newIndex - 1);
    }
    return newIndex;
  };

  const addQuestionIdsSkip = (questionIds) => {
    setToSkip((state) => state.concat(questionIds));
  };

  const removeQuestionIdsFromSkip = (questionIds) => {
    setToSkip((state) => {
      return state.filter((prevAnswer) => !questionIds.includes(prevAnswer));
    });
  };

  const updateSkip = (prevAnswerOption, newAnswerOption) => {
    if (prevAnswerOption && prevAnswerOption.skip) {
      removeQuestionIdsFromSkip(prevAnswerOption.skip);
    }
    if (newAnswerOption.skip) {
      addQuestionIdsSkip(newAnswerOption.skip);
    }
  };

  const handleSubmitAnswer = (answer) => {
    const { answerOption, questionId } = answer.data;

    if (answersRef.current[currentIndex] && answersRef.current[currentIndex].answerOption) {
      updateSkip(answersRef.current[currentIndex].answerOption, answerOption);
    } else {
      updateSkip(null, answerOption);
    }

    setAnswers((prevState) => {
      const newState = [...prevState];
      newState[currentIndex] = { questionId, answerOption };
      return newState;
    });
  };

  return (
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
            onClick={() => {
              const prevQuestionIndex = prevUnskippedQuestionAt(currentIndex - 1);
              setCurrentIndex(prevQuestionIndex);
            }}
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
                userService.resetAnswers(userId).then(() => {
                  setCurrentIndex(0);
                  setToSkip([]);
                  setAnswers([]);
                });
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
  );
};

const QuestionnairePresenterPage = ({ questionnaireId, isAdmin }) => {
  const { userId } = useParams();
  const [{ questions, isLoadingQuestions, isError }] = useFetchQuestions(questionnaireId);
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  return (
    <div>
      {!users || !users.length || isLoadingQuestions || isLoadingUsers ? (
        'Loading...'
      ) : (
        <QuestionnairePresenter
          questions={questions}
          previousAnswers={users[0].answers}
          questionsToSkip={users[0].questionsToSkip}
          stoppedAtIndex={users[0].stoppedAtIndex + 1}
          isAdmin={isAdmin}
        />
      )}
      {(!questions || isError || isErrorUsers) && <div>Something went wrong ...</div>}
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
