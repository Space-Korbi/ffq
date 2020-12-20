import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';

import { DeleteButton } from '../../Button';
import TextEditor from '../../TextEditor';
import { EditorCard } from '../../Cards';

const InputEditor = ({ index, answerOption, dispatch }) => {
  const tabNames = ['Main', 'Optional'];

  const mainTabContent = (
    <TextEditor
      placeholder="Text Input Title"
      onChange={(value) => {
        dispatch({
          type: 'changeTextInputTitle',
          payload: { id: answerOption.id, title: value }
        });
      }}
    />
  );

  const optionalTabContent = (
    <div>
      {answerOption.hasNumberInput ? (
        <div className="d-flex">
          <TextEditor
            placeholder="Number Input Title"
            onChange={(value) => {
              dispatch({
                type: 'changeNumberInputTitle',
                payload: { id: answerOption.id, numberInputTitle: value }
              });
            }}
          />
          <DeleteButton
            onClick={() =>
              dispatch({
                type: 'removeNumberInput',
                payload: { id: answerOption.id }
              })
            }
          />
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({
              type: 'addNumberInput',
              payload: {
                id: answerOption.id,
                numberInputTitle: 'mg'
              }
            })
          }
        >
          Add number input
        </button>
      )}
    </div>
  );

  const removeCard = () => {
    dispatch({
      type: 'removeTextInput',
      payload: { id: answerOption.id }
    });
  };

  return (
    <div className="col my-3">
      <EditorCard
        index={index}
        tabNames={tabNames}
        tabContents={[mainTabContent, optionalTabContent]}
        removeCard={removeCard}
      />
    </div>
  );
};

InputEditor.propTypes = {
  index: number.isRequired,
  answerOption: shape({
    id: string.isRequired,
    title: string,
    hasNumberInput: bool
  }).isRequired,
  dispatch: func.isRequired
};

export default InputEditor;
