import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import AnswerCardsDeck from './AnswerCardsDeck';

const saveAnswer = () => {
  console.log('answer');
};

const AmountAnswer = ({ answerCards }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AnswerCardsDeck answerCards={answerCards} saveAnswer={saveAnswer} />
        </div>
      </div>
    </div>
  );
};

AmountAnswer.propTypes = {
  answerCards: arrayOf(
    shape({
      key: string.isRequired,
      title: string.isRequired,
      subtitle1: string,
      imageURL: string
    })
  ).isRequired
};

export default AmountAnswer;
