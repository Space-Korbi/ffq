import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';

import AnswerButton from './AnswerButton';

const AnswerButtons = ({ leftAnswerOptions, rightAnswerOptions, selectedAnswer, onClick }) => {
  const isSelectedAnswer = (answerOptionId) => {
    console.log('answerOptionId', answerOptionId);
    console.log('selectedAnswer', selectedAnswer);
    if (answerOptionId === selectedAnswer) {
      return true;
    }
    return false;
  };

  return (
    <div className="row mx-3">
      <div className="col-6">
        {leftAnswerOptions.map((answerOption) => (
          <div key={answerOption.id}>
            <AnswerButton
              title={answerOption.title}
              isSelectedAnswer={isSelectedAnswer(answerOption.id)}
              onClick={() => onClick(answerOption.id)}
            />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightAnswerOptions.map((answerOption) => (
          <div key={answerOption.id}>
            <AnswerButton
              title={answerOption.title}
              isSelectedAnswer={isSelectedAnswer(answerOption.id)}
              onClick={() => onClick(answerOption.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

AnswerButtons.propTypes = {
  leftAnswerOptions: arrayOf(shape({ id: string.isRequired, title: string })).isRequired,
  rightAnswerOptions: arrayOf(shape({ id: string.isRequired, title: string })).isRequired,
  selectedAnswer: string,
  onClick: func.isRequired
};

AnswerButtons.defaultProps = {
  selectedAnswer: ''
};

export default AnswerButtons;
