/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import { nanoid } from 'nanoid';

import CardEditor from './CardEditor';

const AmountCardsGrid = ({ answers, removeCard, dispatch }) => {
  return (
    <div className="row no-gutters row-cols-1 row-cols-md-2">
      {answers.map((answer, index) => (
        <CardEditor
          key={answer.id}
          id={index + 1}
          answer={answer}
          removeCard={removeCard}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
};

AmountCardsGrid.propTypes = {
  answers: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired,
  removeCard: func.isRequired,
  dispatch: func.isRequired
};

const CardsEditor = ({ answers, dispatch }) => {
  const [cards, setCards] = useState([]);

  const removeCard = (cardToRemove) => {
    setCards(cards.filter((card) => card.id !== cardToRemove));
  };

  return (
    <div>
      <div className="mt-5 text-center">
        <pre className="m-4">{JSON.stringify(answers, null, 2)}</pre>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => {
            dispatch({
              type: 'addCard',
              payload: { id: nanoid() }
            });
          }}
        >
          Add New Amount Card
        </button>
      </div>
      <div>
        <AmountCardsGrid answers={answers} removeCard={removeCard} dispatch={dispatch} />
      </div>
    </div>
  );
};

CardsEditor.propTypes = {
  answers: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      subtitle: string,
      imageURL: string
    })
  ).isRequired,
  dispatch: func.isRequired
};

export default CardsEditor;
