import React from 'react';
import { arrayOf, func, string, shape, exact } from 'prop-types';
import { nanoid } from 'nanoid';

import ButtonEditor from './ButtonEditor';

const ButtonColumn = ({ answerOptions, position, dispatch }) => {
  return (
    <div>
      {answerOptions.length > 0 && <span className="badge badge-secondary">{position}</span>}
      {answerOptions.map((answerOption, index) => (
        <div key={answerOption.id}>
          <ButtonEditor
            index={index + 1}
            answerOption={answerOption}
            dispatch={dispatch}
            position={position}
          />
        </div>
      ))}
    </div>
  );
};

ButtonColumn.propTypes = {
  answerOptions: arrayOf(exact({ id: string.isRequired, title: string })),
  position: string.isRequired,
  dispatch: func.isRequired
};
ButtonColumn.defaultProps = {
  answerOptions: []
};

const AddButton = ({ position, dispatch }) => {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={() =>
          dispatch({
            type: 'addButton',
            payload: { id: nanoid(), title: '', position }
          })
        }
      >
        Add button {position}
      </button>
    </div>
  );
};

AddButton.propTypes = { position: string.isRequired, dispatch: func.isRequired };

const ButtonsEditor = ({ answerOptions, dispatch }) => {
  const removeButton = (buttonToRemove, position) => {
    dispatch({ type: 'removeButton', payload: { position, id: buttonToRemove.id } });
  };

  return (
    <div className="row no-gutters mt-4">
      <div className="col-lg-12 col-md text-center">
        <div className="row no-gutters my-3">
          <div className="col pr-1">
            <AddButton position="left" dispatch={dispatch} />
          </div>
          <div className="col pl-1">
            <AddButton position="right" dispatch={dispatch} />
          </div>
        </div>
        {answerOptions.left && (
          <div>
            <ButtonColumn
              answerOptions={answerOptions.left}
              position="left"
              dispatch={dispatch}
              removeButton={removeButton}
            />
          </div>
        )}
        {answerOptions.right && (
          <div>
            <ButtonColumn
              answerOptions={answerOptions.right}
              position="right"
              dispatch={dispatch}
              removeButton={removeButton}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ButtonsEditor.propTypes = {
  answerOptions: shape({
    left: arrayOf(exact({ id: string.isRequired, title: string })),
    right: arrayOf(exact({ id: string.isRequired, title: string }))
  }).isRequired,
  dispatch: func.isRequired
};

export default ButtonsEditor;
