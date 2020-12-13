import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, exact } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import { AnswerType } from '../../helpers';

const saveAnswer = () => {
  console.log('answer');
};

function Question({ title, subtitle1, subtitle2, help, answerType, answers }) {
  const [answerContainer, setAnswerContainer] = useState();

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <AnswerButtons
                leftAnswers={answers.frequencyOptions.left}
                rightAnswers={answers.frequencyOptions.right}
                saveAnswer={saveAnswer}
              />
            </div>
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answers={answers.amountOptions} />
          </div>
        );
        break;
      default:
        setAnswerContainer(
          <div className="alert alert-info text-center m-5" role="alert">
            This is a live preview
          </div>
        );
    }
  }, [answerType, answers]);

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
      <div>{answerContainer}</div>
    </div>
  );
}

Question.propTypes = {
  title: string,
  subtitle1: string,
  subtitle2: string,
  help: string,
  answerType: string.isRequired,
  answers: shape({
    type: string.isRequired,
    frequencyAnswers: exact({
      left: arrayOf(exact({ id: string.isRequired, title: string })),
      right: arrayOf(exact({ id: string.isRequired, title: string }))
    }),
    amountAnswers: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        imageURL: string
      })
    ),
    userInputAnswers: shape({})
  }).isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
