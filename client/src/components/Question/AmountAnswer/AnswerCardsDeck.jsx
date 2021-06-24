import React from 'react';
import { arrayOf, string, shape, func } from 'prop-types';
import { get } from 'lodash';

// components
import AnswerCard from './AnswerCard';

/**
 * * Amount Cards Spacing
 * @param answers - Array of answers data
 * @returns [<Amount Card/>] - Amount cards wrapped in a div to apply extra spacing to the first and last card
 */
const AnswerCardsDeck = ({ answerOptions, previouslySubmittedAnswer, onClick }) => {
  return answerOptions.map((answerOption, index) => {
    if (!answerOption.id) {
      return <div />;
    }

    const isSelectedAnswer = (answerOptionId) => {
      if (answerOptionId === get(previouslySubmittedAnswer, 'answerOption.id', '')) {
        return true;
      }
      return false;
    };

    let className = 'px-2 align-self-center';

    switch (index) {
      case 0:
        className = 'pl-5 pr-2 align-self-center';
        break;

      case answerOptions.length - 1:
        className = 'pl-2 pr-5 align-self-center';
        break;

      default:
        className = 'px-2 align-self-center';
    }

    return (
      <div key={answerOption.id} className={className}>
        <AnswerCard
          title={answerOption.title}
          imageName={answerOption.imageName}
          imageURL={answerOption.imageURL}
          isSelectedAnswer={isSelectedAnswer(answerOption.id)}
          onClick={() => onClick(answerOption)}
        />
      </div>
    );
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
  previouslySubmittedAnswer: shape({
    questionId: string,
    answerOption: shape({ id: string, title: string })
  }),
  onClick: func.isRequired
};
export default AnswerCardsDeck;
