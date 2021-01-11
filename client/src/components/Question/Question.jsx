/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, exact, bool, oneOfType, func } from 'prop-types';
import { useParams } from 'react-router-dom';
// custom hooks
import { useSaveAnswer } from '../../hooks';

// components
import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import UserInputAnswer from './UserInputAnswer/UserInputAnswer';

// global constants
import AnswerType from '../../types';

function Answers({ answerOptions, setUserInput, submittedAnswer }) {
  switch (answerOptions.type) {
    case AnswerType.Frequency:
      return (
        <div className="row no-gutters d-flex align-items-stretch">
          <div className="col">
            <AnswerButtons
              leftAnswerOptions={answerOptions.options.left}
              rightAnswerOptions={answerOptions.options.right}
              submittedAnswer={submittedAnswer}
              onClick={setUserInput}
            />
          </div>
        </div>
      );
    case AnswerType.Amount:
      return (
        <div>
          <AmountAnswer
            answerOptions={answerOptions.options}
            submittedAnswer={submittedAnswer}
            onClick={setUserInput}
          />
        </div>
      );
    default:
      return (
        <div className="row no-gutters d-flex align-items-stretch">
          <div className="col">
            <UserInputAnswer
              answerOptions={answerOptions.options}
              submittedAnswer={submittedAnswer}
              onSubmit={setUserInput}
            />
          </div>
        </div>
      );
  }
}

const Question = ({
  id,
  title,
  subtitle1,
  subtitle2,
  help,
  answerOptions,
  submittedAnswer,
  onSubmitAnswer,
  currentIndex
}) => {
  const { userId } = useParams();
  const [userInput, setUserInput] = useState();
  const [{ answer, isSaving, isSavingError }, setAnswer] = useSaveAnswer(userId, id);
  const [latestAnswer, setLatestAnswer] = useState();

  // console.log('Answer', answer);
  // console.log('latestAnswer', latestAnswer);

  useEffect(() => {
    if (!isSaving && !isSavingError) {
      setAnswer({ answerOption: userInput, currentIndex });
    }
  }, [userInput]);

  useEffect(() => {
    if (!answer || !userInput) {
      return;
    }
    if (!isSaving && !isSavingError) {
      setLatestAnswer(answer);
      onSubmitAnswer(answer);
    }
  }, [answer]);

  useEffect(() => {
    setLatestAnswer(submittedAnswer);
  }, [submittedAnswer]);

  return (
    <div>
      <div>
        <Jumbotron title={title} subtitle1={subtitle1} subtitle2={subtitle2} />
      </div>
      {help && (
        <div className="row no-gutters">
          <div className="col d-flex justify-content-end">
            <Help infoText={help} />
          </div>
        </div>
      )}
      <div>
        {isSavingError ? (
          'Something went wrong...'
        ) : (
          <>
            {isSaving ? (
              'Saving...'
            ) : (
              <Answers
                answerOptions={answerOptions}
                setUserInput={setUserInput}
                submittedAnswer={latestAnswer}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

Question.propTypes = {
  id: string.isRequired,
  title: string,
  subtitle1: string,
  subtitle2: string,
  help: string,
  answerOptions: shape({
    type: string.isRequired,
    options: oneOfType([
      exact({
        left: arrayOf(shape({ id: string.isRequired, title: string })),
        right: arrayOf(shape({ id: string.isRequired, title: string }))
      }),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          imageName: string,
          imageURL: string
        })
      ),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          hasNumberInput: bool,
          numberInputTitle: string
        })
      )
    ]).isRequired
  }).isRequired,
  submittedAnswer: oneOfType([
    shape({ questionId: string, answer: shape({ id: string, value: string }) }),
    shape({ questionId: string, answer: arrayOf(shape({ id: string, value: string })) })
  ]),
  onSubmitAnswer: func.isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: '',
  submittedAnswer: undefined
};

export default Question;
