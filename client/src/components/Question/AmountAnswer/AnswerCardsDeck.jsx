import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';

import AnswerCard from './AnswerCard';

/**
 * * Amount Cards Spacing
 * @param answerCards - Array of card data
 * @returns [<Amount Card/>] - Amount cards wrapped in a div to apply extra spacing to the first and last card
 */
const AnswerCardsDeck = ({ answerCards, saveAnswer }) => {
  return answerCards.map((card, index) => {
    switch (index) {
      case 0:
        return (
          <div key={card.key} className="pl-5 pr-2 align-self-center">
            <AnswerCard
              title={card.title}
              subtitle={card.subtitle}
              imageURL={card.imageURL}
              onClick={saveAnswer}
            />
          </div>
        );
      case answerCards.length - 1:
        return (
          <div key={card.key} className="pl-2 pr-5 align-self-center">
            <AnswerCard
              title={card.title}
              subtitle={card.subtitle}
              imageURL={card.imageURL}
              onClick={saveAnswer}
            />
          </div>
        );
      default:
        return (
          <div key={card.key} className="px-2 align-self-center">
            <AnswerCard
              title={card.title}
              subtitle={card.subtitle}
              imageURL={card.imageURL}
              onClick={saveAnswer}
            />
          </div>
        );
    }
  });
};

AnswerCardsDeck.propTypes = {
  answerCards: arrayOf(
    shape({
      key: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired,
  saveAnswer: func.isRequired
};
export default AnswerCardsDeck;
