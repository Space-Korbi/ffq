import React from 'react';
import { arrayOf, func, string, shape, number } from 'prop-types';
import { nanoid } from 'nanoid';

import { OutlineButton } from '../../Button';
import ButtonEditor from './ButtonEditor';
import { CardsGrid } from '../../Cards';

const ButtonColumn = ({ answerOptions, position, dispatch, modalTable }) => {
  const ButtonEditors = answerOptions.map((answerOption, index) => {
    return (
      <ButtonEditor
        key={answerOption.id}
        index={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
        position={position}
        modalTable={modalTable}
      />
    );
  });

  return (
    <div className="text-center">
      {answerOptions.length > 0 && <span className="badge badge-secondary">{position}</span>}
      <CardsGrid Cards={ButtonEditors} gridColumns="row-cols-1" />
    </div>
  );
};

ButtonColumn.propTypes = {
  answerOptions: arrayOf(shape({ id: string.isRequired, title: string })),
  position: string.isRequired,
  dispatch: func.isRequired,
  modalTable: shape({ data: shape({}), modalTableColumns: shape({}), index: number }).isRequired
};
ButtonColumn.defaultProps = {
  answerOptions: []
};

const AddButton = ({ position, dispatch }) => {
  return (
    <div>
      <OutlineButton
        title={`Add button ${position}`}
        onClick={() =>
          dispatch({
            type: 'addButton',
            payload: { id: nanoid(), title: '', position }
          })
        }
      />
    </div>
  );
};

AddButton.propTypes = { position: string.isRequired, dispatch: func.isRequired };

const ButtonsEditor = ({ answerOptions, dispatch, modalTable }) => {
  const removeButton = (buttonToRemove, position) => {
    dispatch({ type: 'removeButton', payload: { position, id: buttonToRemove.id } });
  };

  return (
    <div className="row no-gutters my-5">
      <div className="col-lg-12 col-md text-center">
        <div className="row no-gutters">
          <div className="col pr-1">
            <AddButton position="left" dispatch={dispatch} />
          </div>
          <div className="col pl-1">
            <AddButton position="right" dispatch={dispatch} />
          </div>
        </div>
        <div className="row no-gutters ">
          {answerOptions.left && (
            <div className="col">
              <ButtonColumn
                answerOptions={answerOptions.left}
                position="left"
                dispatch={dispatch}
                removeButton={removeButton}
                modalTable={modalTable}
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
                modalTable={modalTable}
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
    left: arrayOf(shape({ id: string.isRequired, title: string })),
    right: arrayOf(shape({ id: string.isRequired, title: string }))
  }).isRequired,
  dispatch: func.isRequired,
  modalTable: shape({ data: shape({}), modalTableColumns: shape({}), index: number }).isRequired
};

export default ButtonsEditor;
