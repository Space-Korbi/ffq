import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

import AnswerCard from './AnswerCard';

/**
 * * Amount Cards Spacing
 * @param answers - Array of answers data
 * @returns [<Amount Card/>] - Amount cards wrapped in a div to apply extra spacing to the first and last card
 */
const AnswerCardsDeck = ({ answers, saveAnswer }) => {
  return answers.map((answer, index) => {
    if (!answer.id) {
      return <div />;
    }
    switch (index) {
      case 0:
        return (
          <div key={answer.id} className="pl-5 pr-2 mt-5 align-self-center">
            <AnswerCard title={answer.title} imageURL={answer.imageURL} onClick={saveAnswer} />
          </div>
        );
      case answers.length - 1:
        return (
          <div key={answer.id} className="pl-2 pr-5 mt-5 align-self-center">
            <AnswerCard title={answer.title} imageURL={answer.imageURL} onClick={saveAnswer} />
          </div>
        );
      default:
        return (
          <div key={answer.id} className="px-2 mt-5 align-self-center">
            <AnswerCard title={answer.title} imageURL={answer.imageURL} onClick={saveAnswer} />
          </div>
        );
    }
  });
};

AnswerCardsDeck.propTypes = {
  answers: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageURL: string
    })
  ).isRequired,
  saveAnswer: func.isRequired
};
export default AnswerCardsDeck;
