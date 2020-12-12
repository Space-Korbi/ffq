import React from 'react';
import { arrayOf, func, string, shape, exact } from 'prop-types';
import { nanoid } from 'nanoid';

import RemovableListItem from '../../List';

import ButtonEditor from './ButtonEditor';

const ButtonColumn = ({ answers, position, dispatch, removeButton }) => {
  return (
    <ul className="list-group">
      {answers.map((answer) => (
        <RemovableListItem
          key={answer.id}
          content={
            <ButtonEditor
              answer={answer}
              dispatch={dispatch}
              position={position}
              removeButton={removeButton}
            />
          }
          elementToRemove={answer.title}
          onClick={() => removeButton(answer, position)}
        />
      ))}
    </ul>
  );
};

ButtonColumn.propTypes = {
  answers: arrayOf(exact({ id: string.isRequired, title: string })),
  position: string.isRequired,
  dispatch: func.isRequired,
  removeButton: func.isRequired
};
ButtonColumn.defaultProps = {
  answers: []
};

const AddButton = ({ position, dispatch }) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({
            type: 'addButton',
            payload: { position, title: e.target.buttonCreate.value, id: nanoid() }
          });
        }}
      >
        <div className="input-group my-2">
          <input
            type="text"
            className="form-control"
            id="buttonCreate"
            placeholder="New Button"
            aria-label="New Button"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-outline-primary">
              Add {position}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

AddButton.propTypes = { position: string.isRequired, dispatch: func.isRequired };

const ButtonsEditor = ({ answers, dispatch }) => {
  const removeButton = (buttonToRemove, position) => {
    dispatch({ type: 'removeButton', payload: { position, id: buttonToRemove.id } });
  };

  return (
    <div className="row no-gutters mt-4">
      <div className="col-lg-12 col-md-6 text-center">
        <div className="row no-gutters my-3">
          <div className="col pr-1">
            <AddButton position="left" dispatch={dispatch} />
          </div>
          <div className="col pl-1">
            <AddButton position="right" dispatch={dispatch} />
          </div>
        </div>
        Left
        <ButtonColumn
          answers={answers.left}
          position="left"
          dispatch={dispatch}
          removeButton={removeButton}
        />
      </div>
      <div className="col p-1 text-center">
        Right
        <ButtonColumn
          answers={answers.right}
          position="right"
          dispatch={dispatch}
          removeButton={removeButton}
        />
      </div>
    </div>
  );
};

ButtonsEditor.propTypes = {
  answers: shape({
    left: arrayOf(exact({ id: string.isRequired, title: string })),
    right: arrayOf(exact({ id: string.isRequired, title: string }))
  }).isRequired,
  dispatch: func.isRequired
};

export default ButtonsEditor;
