/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';
import RemovableListItem from '../List';
import appendState from '../../helpers/Helpers';

const ButtonColumn = ({ buttonTitles, removeButton }) => {
  return (
    <ul className="list-group">
      {buttonTitles.map((button) => {
        const buttonInput = (
          <div>
            <input className="form-control mb-1" type="text" placeholder={button} readOnly />
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

ButtonColumn.propTypes = {
  buttonTitles: arrayOf(string),
  removeButton: func.isRequired
};
ButtonColumn.defaultProps = {
  buttonTitles: []
};

const AnswerButtons = ({ frequencyAnswers, onChange }) => {
  console.log('AnswerButtons', frequencyAnswers);
  const [leftButtons, setLeftButtons] = useState(frequencyAnswers[0]);
  const [rightButtons, setRightButtons] = useState(frequencyAnswers[1]);

  const removeButtonLeft = (buttonToRemove) => {
    console.log(buttonToRemove);
    onChange(leftButtons.filter((button) => button !== buttonToRemove));
  };

  const removeButtonRight = (buttonToRemove) => {
    onChange(rightButtons.filter((button) => button !== buttonToRemove));
  };

  return (
    <div className="row no-gutters mt-4" id="buttons">
      <div className="col-lg-12 col-md-6 p-1 text-center">
        Left
        <ButtonColumn buttonTitles={leftButtons} removeButton={removeButtonLeft} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsLeft.value, leftButtons, setLeftButtons);
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
      <div className="col p-1 text-center">
        Right
        <ButtonColumn buttonTitles={rightButtons} removeButton={removeButtonRight} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsRight.value, rightButtons, setRightButtons);
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

AnswerButtons.propTypes = {
  frequencyAnswers: arrayOf(arrayOf(string)).isRequired,
  onChange: func.isRequired
};

export default AnswerButtons;
