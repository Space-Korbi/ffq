/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { string, oneOfType, shape, arrayOf } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';
import FrequencyAnswer from './FrequencyAnswer/FrequencyAnswer';
import AmountAnswer from './AmountAnswer/AmountAnswer';
import { AnswerType } from '../../helpers';

function Question({ title, subtitle1, subtitle2, help, answer }) {
  const [answerContainer, setAnswerContainer] = useState();

  useEffect(() => {
    if (!answer.options) {
      return;
    }
    switch (answer.type) {
      case AnswerType.Frequency:
        if (answer.options.length !== 2) {
          return;
        }
        setAnswerContainer(
          <div>
            <FrequencyAnswer leftButtons={answer.options[0]} rightButtons={answer.options[1]} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerContainer(
          <div>
            <AmountAnswer answerCards={answer.options} />
          </div>
        );
        break;
      default:
        setAnswerContainer(
          <div className="alert alert-info text-center m-5" role="alert">
            Choose an Answer Type
          </div>
        );
    }
  }, [answer]);

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
  answer: shape({
    type: string.isRequired,
    options: oneOfType([arrayOf(arrayOf(string)), arrayOf(string)]).isRequired
  }).isRequired
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
