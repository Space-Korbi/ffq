import React from 'react';
import { arrayOf, string, element } from 'prop-types';

const CardsGrid = ({ Cards, gridColumns }) => {
  return (
    <div className={`row no-gutters ${gridColumns}`}>
      {Cards.map((Card) => {
        return Card;
      })}
    </div>
  );
};

CardsGrid.propTypes = {
  Cards: arrayOf(element).isRequired,
  gridColumns: string.isRequired
};

export default CardsGrid;
