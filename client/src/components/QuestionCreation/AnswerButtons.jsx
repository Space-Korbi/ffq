import React, { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';
import RemovableListItem from '../List';
import appendState from '../../helpers/Helpers';

const leftButtonsText = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche',
  '2 - 4 Mal pro Woche',
  '5 - 6 Mal pro Woche'
];

const rightButtonsText = ['1 Mal pro Tag', '2 Mal pro Tag', '3 - 4 Mal pro Tag', '5+ pro Tag'];

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

const AnswerButtonCreation = () => {
  const [buttonsLeft, setButtonsLeft] = useState(leftButtonsText);
  const [buttonsRight, setButtonsRight] = useState(rightButtonsText);

  const removeButtonLeft = (buttonToRemove) => {
    setButtonsLeft(buttonsLeft.filter((button) => button !== buttonToRemove));
  };

  const removeButtonRight = (buttonToRemove) => {
    setButtonsRight(buttonsRight.filter((button) => button !== buttonToRemove));
  };

  return (
    <div className="row no-gutters mt-4" id="buttons">
      <div className="col m-1 text-center">
        Left
        <AnswerButtonList buttonTitles={buttonsLeft} removeButton={removeButtonLeft} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsLeft.value, buttonsLeft, setButtonsLeft);
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
        <AnswerButtonList buttonTitles={buttonsRight} removeButton={removeButtonRight} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            appendState(e.target.buttonsRight.value, buttonsRight, setButtonsRight);
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

export default AnswerButtonCreation;
