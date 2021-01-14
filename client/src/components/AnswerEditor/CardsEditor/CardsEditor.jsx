import React from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import { nanoid } from 'nanoid';

import { OutlineButton } from '../../Button';
import CardEditor from './CardEditor';
import { CardsGrid } from '../../Cards';

const CardsEditor = ({ answerOptions, dispatch }) => {
  const CardEditors = answerOptions.map((answerOption, index) => {
    return (
      <CardEditor
        key={answerOption.id}
        index={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div className="my-5 text-center">
      <OutlineButton
        title="Add card"
        onClick={() =>
          dispatch({
            type: 'addCard',
            payload: { id: nanoid() }
          })
        }
      />
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
