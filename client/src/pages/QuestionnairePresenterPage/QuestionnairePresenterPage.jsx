/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { bool, string } from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

// services
import { userService, questionnaireService, authService } from '../../services';

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
  previousPauses,
  questionsToSkip,
  isAdmin,
  iterationId
}) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [pauses, setPauses] = useState(previousPauses);
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

  const handleOnPause = () => {
    console.log('pauses', pauses);

    if (pauses.indexOf(currentIndex) !== -1) {
      return;
    }
    userService.updateUserData(userId, {
      iterations: [{ id: iterationId, pausedAt: [...pauses, currentIndex] }]
    });
    setPauses((prevState) => [...prevState, currentIndex]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark questionnaire">
        {isAdmin ? (
          <div className="row no-gutters flex-row w-100 ">
            <div className="col d-flex justify-content-between my-2">
              <button
                type="button"
                className="btn btn-sm btn-light"
                disabled={isDisabled}
                onClick={() => {
                  const prevQuestionIndex = prevUnskippedQuestionAt(currentIndex - 1);
                  setCurrentIndex(prevQuestionIndex);
                }}
              >
                Back
              </button>
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
                className="btn btn-sm btn-outline-warning"
                onClick={() => {
                  history.push(`/users/${userId}`);
                }}
              >
                Exit
              </button>
            </div>
            <div className="row no-gutters flex-row w-100">
              <div className="py-1" />
              <ProgressIndicator currentPosition={currentIndex} length={questions.length} />
            </div>
          </div>
        ) : (
          <div className="row no-gutters flex-row w-100">
            <div className="col d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-light"
                disabled={isDisabled}
                onClick={() => {
                  const prevQuestionIndex = prevUnskippedQuestionAt(currentIndex - 1);
                  setCurrentIndex(prevQuestionIndex);
                }}
              >
                Back
              </button>
              <div className="pl-2" />
              <ProgressIndicator currentPosition={currentIndex} length={questions.length} />
              <div className="pl-2" />
              <button
                type="button"
                className="btn btn btn-light"
                onClick={() => handleOnPause()}
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                Pause
              </button>
            </div>
          </div>
        )}
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
                    iterationId={iterationId}
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Frage {currentIndex + 1}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Alle antworten wurden gespeichert. Sie können sich jederzeit ausloggen und das
              Ausfüllen des Fragebogens zu einem späteren Zeitpunkt fortsetzen.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => authService.logoutUser()}
              >
                Ausloggen
              </button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">
                Umfrage Fortsetzen
              </button>
            </div>
          </div>
        </div>
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
      let pauses = [];
      const status = users[0].iterations.filter(
        (prevIteration) => prevIteration.id === iterationId
      );
      if (status && status.length) {
        answers = status[0].answers;
        questionsToSkip = status[0].questionsToSkip;
        stoppedAtIndex = status[0].stoppedAtIndex;
        pauses = status[0].pausedAt;
      }

      setIteration({ answers, questionsToSkip, stoppedAtIndex, pauses });
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
          previousPauses={iteration.pauses}
          isAdmin={isAdmin}
          iterationId={iterationId}
        />
      )}
      {!fetchedQuestions.length && (
        <div className="alert alert-warning d-flex justify-content-center mt-5" role="alert">
          The questionnaire has no questions.
        </div>
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
