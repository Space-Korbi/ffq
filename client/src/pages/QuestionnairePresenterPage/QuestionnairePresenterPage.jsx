/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { bool, string } from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

// services
import { userService, questionnaireService } from '../../services';

// custom hooks
import { useFetchQuestions, useFetchUsers } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import { Question } from '../../components/Question';
import Submit from '../../components/DefaultSegments';
import ProgressIndicator from '../../components/ProgressIndicator';

const QuestionnairePresenter = ({
  questions,
  previousAnswers,
  questionsToSkip,
  isAdmin,
  iterationId
}) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [toSkip, setToSkip] = useState(questionsToSkip);
  const { userId } = useParams();
  const answersRef = useRef(answers);

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

  useEffect(() => {
    answersRef.current = answers;

    if (answers && answers.length && answers[0]) {
      const nextQuestionIndex = nextUnskippedQuestionAt(currentIndex + 1);
      setCurrentIndex(nextQuestionIndex);
    }
  }, [answers]);

  useEffect(() => {
    if (!previousAnswers || !previousAnswers.length) {
      const initalAnswers = new Array(questions.length);
      setAnswers(initalAnswers);
    } else if (questions && questions.length) {
      const initalAnswers = new Array(questions.length).fill(null);
      previousAnswers.forEach((answer) => {
        const index = questions.findIndex((question) => {
          return question._id === answer.questionId;
        });
        if (index !== -1) {
          setCurrentIndex(() => nextUnskippedQuestionAt(index));
          initalAnswers[index] = answer;
        }
      });
      setAnswers(initalAnswers);
    }
  }, [questions]);

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
    const { answerOption, questionId } = answer;

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
      <nav className="navbar navbar-expand-md navbar-dark bg-dark questionnaire">
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
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-warning"
                onClick={() => {
                  userService
                    .updateUserData(userId, { iterations: [{ id: 0, answers: [] }] })
                    .then(() => {
                      setCurrentIndex(0);
                      setToSkip([]);
                      setAnswers([]);
                    });
                }}
              >
                Reset answers
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-warning ml-2"
                onClick={() => {
                  history.push(`/users/${userId}`);
                }}
              >
                Exit
              </button>
            </>
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
      <div>
        {questions.length > 0 && (
          <>
            {currentIndex >= questions.length ? (
              <Submit iterationId={iterationId} />
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
                    iterationId={iterationId}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const QuestionnairePresenterPage = ({ isAdmin }) => {
  const { userId, iterationId } = useParams();

  const [
    { fetchedQuestions, isLoadingQuestions, isErrorQuestions },
    setQuestionniareId
  ] = useFetchQuestions();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);
  const [iteration, setIteration] = useState();

  useEffect(() => {
    const fetchIds = async () => {
      await questionnaireService.getQuestionnaires({ fields: '_id' }).then((res) => {
        console.log(res);
        setQuestionniareId(res.data.questionnaires[0]._id);
      });
    };

    fetchIds();
  }, []);

  useEffect(() => {
    if (users && users.length) {
      let answers = [];
      let questionsToSkip = [];
      let stoppedAtIndex = -1;
      const status = users[0].iterations.filter(
        (prevIteration) => prevIteration.id === iterationId
      );
      if (status && status.length) {
        answers = status[0].answers;
        questionsToSkip = status[0].questionsToSkip;
        stoppedAtIndex = status[0].stoppedAtIndex;
      }

      setIteration({ answers, questionsToSkip, stoppedAtIndex });
    }
  }, [users]);

  return (
    <div>
      {(isErrorUsers || isErrorQuestions) && (
        <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
          Something went wrong...
        </div>
      )}
      {(isLoadingUsers || isLoadingQuestions) && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner />
        </div>
      )}
      {users && users.length > 0 && fetchedQuestions && iteration && (
        <QuestionnairePresenter
          questions={fetchedQuestions}
          previousAnswers={iteration.answers}
          questionsToSkip={iteration.questionsToSkip}
          stoppedAtIndex={iteration.stoppedAtIndex + 1}
          isAdmin={isAdmin}
          iterationId={iterationId}
        />
      )}
    </div>
  );
};

QuestionnairePresenterPage.propTypes = {
  isAdmin: bool
};

QuestionnairePresenterPage.defaultProps = {
  isAdmin: false
};
export default QuestionnairePresenterPage;
