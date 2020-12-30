import React, { useEffect, useState } from 'react';
import { string, shape, arrayOf, exact, bool, oneOfType } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import UserInputAnswer from './UserInputAnswer/UserInputAnswer';
import AnswerType from '../../types';

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
                leftAnswerOptions={answerOptions.options.left}
                rightAnswerOptions={answerOptions.options.right}
                saveAnswer={saveAnswer}
              />
            </div>
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answerOptions={answerOptions.options} />
          </div>
        );
        break;
      default:
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <UserInputAnswer answerOptions={answerOptions.options} />
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
    options: oneOfType([
      exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
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
  }).isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
