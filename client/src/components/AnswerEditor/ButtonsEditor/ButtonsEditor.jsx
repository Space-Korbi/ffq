import React from 'react';
import { arrayOf, func, string, shape, exact } from 'prop-types';
import { nanoid } from 'nanoid';

import ButtonEditor from './ButtonEditor';
import { CardsGrid } from '../../Cards';

const ButtonColumn = ({ answerOptions, position, dispatch }) => {
  const ButtonEditors = answerOptions.map((answerOption, index) => {
    return (
      <ButtonEditor
        key={answerOption.id}
        index={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
        position={position}
      />
    );
  });

  return (
    <div>
      {answerOptions.length > 0 && <span className="badge badge-secondary">{position}</span>}
      <CardsGrid Cards={ButtonEditors} gridColumns="row-cols-1" />
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

const ButtonOutline = ({ position, dispatch }) => {
  return (
    <div>
      <button
        type="submit"
        className="btn btn-outline-primary"
        onClick={() =>
          dispatch({
            type: 'ButtonOutline',
            payload: { id: nanoid(), title: '', position }
          })
        }
      >
        Add button {position}
      </button>
    </div>
  );
};

ButtonOutline.propTypes = { position: string.isRequired, dispatch: func.isRequired };

const ButtonsEditor = ({ answerOptions, dispatch }) => {
  const removeButton = (buttonToRemove, position) => {
    dispatch({ type: 'removeButton', payload: { position, id: buttonToRemove.id } });
  };

  return (
    <div className="row no-gutters mt-4">
      <div className="col-lg-12 col-md text-center">
        <div className="row no-gutters my-3">
          <div className="col pr-1">
            <ButtonOutline position="left" dispatch={dispatch} />
          </div>
          <div className="col pl-1">
            <ButtonOutline position="right" dispatch={dispatch} />
          </div>
        </div>
        <div className="row no-gutters my-3">
          {answerOptions.left && (
            <div className="col-12 col-sm-6">
              <ButtonColumn
                answerOptions={answerOptions.left}
                position="left"
                dispatch={dispatch}
                removeButton={removeButton}
              />
            </div>
          )}
          {answerOptions.right && (
            <div className="col">
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
