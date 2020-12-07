/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import RemovableListItem from '../List';
import appendState from '../../helpers/Helpers';

const AnswerButtonList = ({ buttonTitles, removeButton }) => {
  return (
    <ul className="list-group">
      {buttonTitles.map((button) => {
        const buttonInput = (
          <div>
            <input
              className="form-control mb-1"
              type="text"
              placeholder={button}
              readOnly
              style={{ minWidth: '200px' }}
            />
            <div className="input-group input-group-sm">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Skip next
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
          </div>
        );
        return (
          <RemovableListItem
            key={button}
            content={buttonInput}
            elementToRemove={button}
            onClick={removeButton}
          />
        );
      })}
    </ul>
  );
};

AnswerButtonList.propTypes = {
  buttonTitles: arrayOf(string).isRequired,
  removeButton: func.isRequired
};

const AnswerButtonCreation = ({ leftButtons, rightButtons, onChangeLeft, onChangeRight }) => {
  const removeButtonLeft = (buttonToRemove) => {
    onChangeLeft(leftButtons.filter((button) => button !== buttonToRemove));
  };

  const removeButtonRight = (buttonToRemove) => {
    onChangeRight(rightButtons.filter((button) => button !== buttonToRemove));
  };

  return (
    <div className="row no-gutters mt-4" id="buttons">
      <div className="col m-1 text-center">
        Left
        <AnswerButtonList buttonTitles={leftButtons} removeButton={removeButtonLeft} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsLeft.value, leftButtons, onChangeLeft);
          }}
        >
          <div className="input-group my-2">
            <input
              type="text"
              className="form-control"
              id="buttonsLeft"
              placeholder="New Button"
              aria-label="New Button"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="col m-1 text-center">
        Right
        <AnswerButtonList buttonTitles={rightButtons} removeButton={removeButtonRight} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsRight.value, rightButtons, onChangeRight);
          }}
        >
          <div className="input-group my-2">
            <input
              type="text"
              className="form-control"
              id="buttonsRight"
              placeholder="New Button"
              aria-label="New Button"
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-outline-primary">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AnswerButtonCreation.propTypes = {
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired,
  onChangeLeft: func.isRequired,
  onChangeRight: func.isRequired
};

export default AnswerButtonCreation;
