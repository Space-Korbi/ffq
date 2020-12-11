/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { string, oneOfType, shape, arrayOf } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import AnswerButtons from './FrequencyAnswer/AnswerButtons';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import { AnswerType } from '../../helpers';

const saveAnswer = () => {
  console.log('answer');
};

function Question({ title, subtitle1, subtitle2, help, answers }) {
  const [answerContainer, setAnswerContainer] = useState();

  useEffect(() => {
    if (!answers.options) {
      return;
    }
    switch (answers.type) {
      case AnswerType.Frequency:
        if (answers.options.length !== 2) {
          return;
        }
        setAnswerContainer(
          <div className="row no-gutters d-flex align-items-stretch">
            <div className="col">
              <AnswerButtons
                leftAnswers={answers.options[0]}
                rightAnswers={answers.options[1]}
                saveAnswer={saveAnswer}
              />
            </div>
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answers={answers.options} />
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
  }, [answers]);

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
  answers: shape({
    type: string.isRequired,
    options: oneOfType([
      arrayOf(arrayOf(shape({ key: string.isRequired, title: string }))),
      arrayOf(
        shape({
          key: string.isRequired,
          title: string,
          subtitle: string,
          imageURL: string
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
