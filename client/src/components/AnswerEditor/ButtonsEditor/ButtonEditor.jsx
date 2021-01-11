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
    <div className="d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={() => {
          dispatch({
            type: 'setSkippedQuestions',
            payload: {
              id: answerOption.id,
              position,
              skip: ['zuXep7dQpbtxP9eVDHGIC', '28cmxuyM4TEUM-AAgM67u']
            }
          });
          console.log('open modal');
        }}
      >
        Select questions to skip
      </button>
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
