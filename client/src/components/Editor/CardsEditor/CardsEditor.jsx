import React from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import { nanoid } from 'nanoid';

import CardEditor from './CardEditor';
import CardsGrid from '../../Cards';

const CardsEditor = ({ answerOptions, dispatch }) => {
  return (
    <div>
      <div className="mt-5 text-center">
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
        <CardsGrid answerOptions={answerOptions} dispatch={dispatch} Card={CardEditor} />
      </div>
    </div>
  );
};

CardsEditor.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageURL: string
    })
  ).isRequired,
  dispatch: func.isRequired
};

export default CardsEditor;
