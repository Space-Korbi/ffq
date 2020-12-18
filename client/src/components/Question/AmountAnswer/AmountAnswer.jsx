import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import AnswerCardsDeck from './AnswerCardsDeck';

const saveAnswer = () => {
  console.log('answer');
};

const AmountAnswer = ({ answerOptions }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AnswerCardsDeck answerOptions={answerOptions} saveAnswer={saveAnswer} />
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
  ).isRequired
};

export default AmountAnswer;
