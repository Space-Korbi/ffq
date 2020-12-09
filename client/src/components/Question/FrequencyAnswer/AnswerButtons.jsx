import React from 'react';
import { arrayOf, func, string } from 'prop-types';

import AnswerButton from './AnswerButton';

const AnswerButtons = ({ leftButtons, rightButtons, saveAnswer }) => {
  return (
    <div className="row mx-3">
      <div className="col-6">
        {leftButtons.map((button) => (
          <div key={button}>
            <AnswerButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightButtons.map((button) => (
          <div key={button}>
            <AnswerButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>
    </div>
  );
};

AnswerButtons.propTypes = {
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired,
  saveAnswer: func.isRequired
};

export default AnswerButtons;
