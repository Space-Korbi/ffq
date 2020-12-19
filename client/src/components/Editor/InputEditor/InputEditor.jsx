import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { nanoid } from 'nanoid';

import InputEditorCard from './InputEditorCard';
import CardsGrid from '../../Cards';

const InputEditor = ({ answerOptions, dispatch }) => {
  const InputEditors = answerOptions.map((answerOption, index) => {
    return (
      <InputEditorCard
        key={answerOption.id}
        id={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div>
      <div className="mt-5 text-center">
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              dispatch({
                type: 'addTextInput',
                payload: { id: nanoid() }
              });
            }}
          >
            Add text input
          </button>
        </div>

        <div>
          <CardsGrid Cards={InputEditors} gridColumns="row-cols-1 row-cols-md-2" />
        </div>
      </div>
    </div>
  );
};

InputEditor.propTypes = {
  answerOptions: arrayOf(
    shape({
      key: string,
      type: string,
      title: string
    })
  ).isRequired,
  dispatch: func.isRequired
};

export default InputEditor;
