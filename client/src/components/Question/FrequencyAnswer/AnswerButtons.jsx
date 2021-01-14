import React from 'react';
import { arrayOf, shape, func, string } from 'prop-types';
import { get } from 'lodash';

import AnswerButton from './AnswerButton';

const AnswerButtons = ({ leftAnswerOptions, rightAnswerOptions, submittedAnswer, onClick }) => {
  const isSelectedAnswer = (answerOptionId) => {
    if (answerOptionId === get(submittedAnswer, 'answerOption.id', '')) {
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
              onClick={() => onClick(answerOption)}
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
              onClick={() => onClick(answerOption)}
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
  submittedAnswer: shape({
    questionId: string,
    answerOption: shape({ id: string, title: string })
  }),
  onClick: func.isRequired
};

AnswerButtons.defaultProps = {
  submittedAnswer: { questionId: '', answerOption: { id: '', title: '' } }
};

export default AnswerButtons;
