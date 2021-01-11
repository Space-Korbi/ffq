/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
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
  const [toSkip, setToSkip] = useState([]);

  // get data
  const { userId } = useParams();
  const [{ questions, isLoadingQuestions, isError }] = useFetchQuestions(questionnaireId);
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  const answersRef = useRef(answers);

  console.log(toSkip);
  const willSkipQuestionAt = (index) => {
    if (questions && questions[index] && toSkip.includes(questions[index]._id)) {
      return true;
    }
    return false;
  };
  // Recursevly looking for the next Question that wont be skipped
  const nextUnskippedQuestionAt = (index) => {
    console.log('Starting at index', index);
    console.log('trying going to', index);
    const newIndex = index;
    if (willSkipQuestionAt(index)) {
      console.log('skipping', index);
      return nextUnskippedQuestionAt(newIndex + 1);
    }
    return newIndex;
  };

  const prevUnskippedQuestionAt = (index) => {
    console.log('trying going prev to', index);
    const newIndex = index;
    if (willSkipQuestionAt(index)) {
      console.log('skipping back', index);
      return prevUnskippedQuestionAt(newIndex - 1);
    }
    return newIndex;
  };

  useEffect(() => {
    if (get(users, ['0', 'answers'], false)) {
      const user = users[0];
      setToSkip(user.questionsToSkip);
      setAnswers(user.answers);
    }
  }, [users]);

  useEffect(() => {
    if (get(users, ['0', 'answers'], false)) {
      const user = users[0];
      if (currentIndex === 0) {
        const nextQuestionIndex = nextUnskippedQuestionAt(user.stoppedAtIndex + 1);
        setCurrentIndex(nextQuestionIndex);
      }
    }
  }, [toSkip]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    if (currentIndex <= 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [currentIndex]);

  const addQuestionIdsSkip = (questionIds) => {
    setToSkip((state) => state.concat(questionIds));
  };

  const removeQuestionIdsFromSkip = (questionIds) => {
    setToSkip((state) => {
      return state.filter((prevAnswer) => !questionIds.includes(prevAnswer));
    });
  };

  const updateSkip = (prevAnswerOption, newAnswerOption) => {
    console.log(prevAnswerOption, newAnswerOption);
    if (prevAnswerOption && prevAnswerOption.skip) {
      // console.log('removing', prevAnswerOption.skip);
      removeQuestionIdsFromSkip(prevAnswerOption.skip);
    }
    if (newAnswerOption.skip) {
      // console.log('Adding', newAnswerOption.skip);
      addQuestionIdsSkip(newAnswerOption.skip);
    }
  };

  const handleSubmitAnswer = (answer) => {
    const { answerOption, questionId } = answer.data;

    // updating questionIds in toSkip
    const index = findIndex(answersRef.current, { questionId });
    if (index !== -1) {
      updateSkip(answersRef.current[index].answerOption, answerOption);
    } else {
      updateSkip(null, answerOption);
    }

    // updating answers
    setAnswers((prevAnswers) => {
      const newAnswers = prevAnswers;
      if (index !== -1) {
        newAnswers[index].answerOption = answerOption;
      } else {
        newAnswers.push({
          questionId,
          answerOption
        });
      }
      return newAnswers;
    });

    const nextQuestionIndex = nextUnskippedQuestionAt(currentIndex + 1);
    setCurrentIndex(nextQuestionIndex);
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
