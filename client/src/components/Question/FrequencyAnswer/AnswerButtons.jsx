import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';

import AnswerButton from './AnswerButton';

const AnswerButtons = ({ leftAnswerOptions, rightAnswerOptions, onClick }) => {
  return (
    <div className="row mx-3">
      <div className="col-6">
        {leftAnswerOptions.map((answerOption) => (
          <div key={answerOption.id}>
            <AnswerButton title={answerOption.title} onClick={onClick} />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightAnswerOptions.map((answerOption) => (
          <div key={answerOption.id}>
            <AnswerButton title={answerOption.title} onClick={onClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

AnswerButtons.propTypes = {
  leftAnswerOptions: arrayOf(shape({ id: string.isRequired, title: string })).isRequired,
  rightAnswerOptions: arrayOf(shape({ id: string.isRequired, title: string })).isRequired,
  onClick: func.isRequired
};

export default AnswerButtons;
