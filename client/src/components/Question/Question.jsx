import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, exact, bool } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import UserInputAnswer from './UserInputAnswer/UserInputAnswer';
import { AnswerType } from '../../helpers';

const saveAnswer = () => {
  // eslint-disable-next-line
  console.log('answer');
};

function Question({ title, subtitle1, subtitle2, help, answerType, answerOptions }) {
  const [answerContainer, setAnswerContainer] = useState();

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <AnswerButtons
                leftAnswerOptions={answerOptions.frequencyOptions.left}
                rightAnswerOptions={answerOptions.frequencyOptions.right}
                saveAnswer={saveAnswer}
              />
            </div>
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answerOptions={answerOptions.amountOptions} />
          </div>
        );
        break;
      default:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <UserInputAnswer answerOptions={answerOptions.userInputOptions} />
            </div>
          </div>
        );
    }
  }, [answerType, answerOptions]);

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
  answerOptions: shape({
    type: string.isRequired,
    frequencyOptions: exact({
      left: arrayOf(exact({ id: string.isRequired, title: string })),
      right: arrayOf(exact({ id: string.isRequired, title: string }))
    }),
    amountOptions: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        imageName: string
      })
    ),
    userInputOptions: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        hasNumberInput: bool,
        numberInputTitle: string
      })
    )
  }).isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
