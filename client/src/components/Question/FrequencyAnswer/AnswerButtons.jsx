import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';

import AnswerButton from './AnswerButton';

const AnswerButtons = ({ leftAnswers, rightAnswers, saveAnswer }) => {
  return (
    <div className="row mx-3">
      <div className="col-6">
        {leftAnswers.map((answer) => (
          <div key={answer.title}>
            <AnswerButton text={answer.title} onClick={saveAnswer} />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightAnswers.map((answer) => (
          <div key={answer.title}>
            <AnswerButton text={answer.title} onClick={saveAnswer} />
          </div>
        ))}
      </div>
    </div>
  );
};

AnswerButtons.propTypes = {
  leftAnswers: arrayOf(shape({ key: string.isRequired, title: string })).isRequired,
  rightAnswers: arrayOf(shape({ key: string.isRequired, title: string })).isRequired,
  saveAnswer: func.isRequired
};

export default AnswerButtons;
