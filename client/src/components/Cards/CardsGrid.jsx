import React from 'react';
import { arrayOf, shape, string, func } from 'prop-types';

const CardsGrid = ({ answerOptions, dispatch, Card }) => {
  return (
    <div className="row no-gutters row-cols-1 row-cols-md-2">
      {answerOptions.map((answerOption, index) => (
        <Card
          key={answerOption.id}
          id={index + 1}
          answerOption={answerOption}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

CardsGrid.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageURL: string
    })
  ).isRequired,
  dispatch: func.isRequired,
  Card: func.isRequired
};

export default CardsGrid;
