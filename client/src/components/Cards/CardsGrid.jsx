import React from 'react';
import { arrayOf, shape, string, func, element } from 'prop-types';

const CardsGrid = ({ answerOptions, dispatch, Card }) => {
  return (
    <div className="row no-gutters row-cols-1 row-cols-md-2">
      {answerOptions.map((answerOption, index) => {
        return (
          <Card
            key={answerOption.id}
            id={index + 1}
            answerOption={answerOption}
            dispatch={dispatch}
          />
        );
      })}
    </div>
  );
};

export const CardsGrid2 = ({ Cards, gridColumns }) => {
  console.log('CARDS', Cards);
  return (
    <div className={`row no-gutters ${gridColumns}`}>
      {Cards.map((Card) => {
        return Card;
      })}
    </div>
  );
};

CardsGrid2.propTypes = {
  Cards: arrayOf(element).isRequired,
  gridColumns: string.isRequired
};

/**
 * - Cards
 * - gridColumns: [string]
 * - dispatch
 */

CardsGrid.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageName: string
    })
  ).isRequired,
  dispatch: func.isRequired,
  Card: func.isRequired
};

export default CardsGrid;
