/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import { nanoid } from 'nanoid';

import CardEditor from './CardEditor';
import CardsGrid from '../../Cards';

const CardsEditor = ({ answerOptions, dispatch }) => {
  const CardEditors = answerOptions.map((answerOption, index) => {
    return (
      <CardEditor
        key={answerOption.id}
        id={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div className="my-5 text-center">
      <div>
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
        <CardsGrid Cards={CardEditors} gridColumns="row-cols-1 row-cols-md-2" />
      </div>
    </div>
  );
};

CardsEditor.propTypes = {
  answerOptions: arrayOf(
    shape({
      id: string.isRequired,
      title: string,
      imageName: string
    })
  ).isRequired,
  dispatch: func.isRequired
};

export default CardsEditor;
