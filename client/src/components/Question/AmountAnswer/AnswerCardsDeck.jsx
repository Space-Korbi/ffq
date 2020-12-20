import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

import AnswerCard from './AnswerCard';

/**
 * * Amount Cards Spacing
 * @param answers - Array of answers data
 * @returns [<Amount Card/>] - Amount cards wrapped in a div to apply extra spacing to the first and last card
 */
const AnswerCardsDeck = ({ answerOptions, saveAnswer }) => {
  return answerOptions.map((answerOption, index) => {
    if (!answerOption.id) {
      return <div />;
    }

    switch (index) {
      case 0:
        return (
          <div key={answerOption.id} className="pl-5 pr-2 mt-5 align-self-center">
            <AnswerCard
              title={answerOption.title}
              imageName={answerOption.imageName}
              imageURL={answerOption.imageURL}
              onClick={saveAnswer}
            />
          </div>
        );
      case answerOptions.length - 1:
        return (
          <div key={answerOption.id} className="pl-2 pr-5 mt-5 align-self-center">
            <AnswerCard
              title={answerOption.title}
              imageName={answerOption.imageName}
              onClick={saveAnswer}
              imageURL={answerOption.imageURL}
            />
          </div>
        );
      default:
        return (
          <div key={answerOption.id} className="px-2 mt-5 align-self-center">
            <AnswerCard
              title={answerOption.title}
              imageName={answerOption.imageName}
              onClick={saveAnswer}
              imageURL={answerOption.imageURL}
            />
          </div>
        );
    }
  });
};

AnswerCardsDeck.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageName: string
    })
  ).isRequired,
  saveAnswer: func.isRequired
};
export default AnswerCardsDeck;
