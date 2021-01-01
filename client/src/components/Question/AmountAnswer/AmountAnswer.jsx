import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

import AnswerCardsDeck from './AnswerCardsDeck';

const AmountAnswer = ({ answerOptions, submittedAnswer, onClick }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AnswerCardsDeck
            answerOptions={answerOptions}
            submittedAnswer={submittedAnswer}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

AmountAnswer.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageName: string
    })
  ).isRequired,
  submittedAnswer: shape({ questionId: string, answer: shape({ id: string, value: string }) }),
  onClick: func.isRequired
};

AmountAnswer.defaultProps = {
  submittedAnswer: { questionId: '', answer: { id: '', value: '' } }
};

export default AmountAnswer;
