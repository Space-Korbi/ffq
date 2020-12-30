import React from 'react';
import { arrayOf, func, string, shape, exact, number } from 'prop-types';

import TextEditor from '../../TextEditor';
import { EditorCard } from '../../Cards';

const ButtonEditor = ({ dispatch, position, answerOption, index }) => {
  const tabNames = ['Text', 'Action'];

  const textTabContent = (
    <TextEditor
      placeholder="Button Title"
      value={answerOption.title}
      onChange={(value) => {
        dispatch({
          type: 'changeButtonTitle',
          payload: { id: answerOption.id, position, title: value }
        });
      }}
    />
  );

  const actionTabContent = (
    <div className="input-group input-group-sm flex-nowrap">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Skip
        </span>
      </div>
      <input
        type="number"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
      <div className="input-group-append">
        <span className="input-group-text" id="inputGroup-sizing-sm">
          Questions
        </span>
      </div>
    </div>
  );

  const removeCard = () => {
    dispatch({
      type: 'removeButton',
      payload: { id: answerOption.id, position }
    });
  };

  return (
    <div className="col my-3">
      <EditorCard
        index={index}
        tabNames={tabNames}
        tabContents={[textTabContent, actionTabContent]}
        removeCard={removeCard}
      />
    </div>
  );
};

ButtonEditor.propTypes = {
  answerOption: shape({
    type: string,
    options: shape({
      left: arrayOf(exact({ id: string.isRequired, title: string })),
      right: arrayOf(exact({ id: string.isRequired, title: string }))
    })
  }).isRequired,
  dispatch: func.isRequired,
  position: string.isRequired,
  index: number.isRequired
};

export default ButtonEditor;
