import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import AnswerCardsDeck from './AnswerCardsDeck';

const saveAnswer = () => {
  console.log('answer');
};

const AmountAnswer = ({ answers }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AnswerCardsDeck answers={answers} saveAnswer={saveAnswer} />
        </div>
      </div>
    </div>
  );
};

AmountAnswer.propTypes = {
  answers: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired
};

export default AmountAnswer;
