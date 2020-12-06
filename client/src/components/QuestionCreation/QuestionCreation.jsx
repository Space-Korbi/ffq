/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { arrayOf, string } from 'prop-types';
import { PlusIcon } from '@primer/octicons-react';
import Navigation from '../Navigation';
import Question from '../Question';
import RemovableListItem from '../List';

const tabs = ['Creation', 'Order'];
const leftButtonsText = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche',
  '2 - 4 Mal pro Woche',
  '5 - 6 Mal pro Woche'
];

const rightButtonsText = ['1 Mal pro Tag', '2 Mal pro Tag', '3 - 4 Mal pro Tag', '5+ pro Tag'];

const QuestionTypeSelection = () => {
  return (
    <div>
      <div className="input-group my-2">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Question Type
          </label>
        </div>
        <select className="custom-select" id="inputGroupSelect01">
          <option defaultValue>Choose...</option>
          <option value="1">Type 1 (Buttons)</option>
          <option value="2">Type 2 (Pictures) </option>
          <option value="3">Type 3 (User Input)</option>
        </select>
      </div>
    </div>
  );
};

const QuestionTitelInput = () => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Titel
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

const QuestionCreation = () => {
  const [buttonsLeft, setButtonsLeft] = useState(leftButtonsText);
  const [buttonsRight, setButtonsRight] = useState(rightButtonsText);

  const removeButtonLeft = (buttonToRemove) => {
    setButtonsLeft(buttonsLeft.filter((button) => button !== buttonToRemove));
  };

  const removeButtonRight = (buttonToRemove) => {
    setButtonsRight(buttonsRight.filter((button) => button !== buttonToRemove));
  };

  const ButtonInputList = ({ buttonTitles, leftColumn }) => {
    return (
      <ul className="px-0">
        {buttonTitles.map((button) => {
          const buttonInput = (
            <div>
              <input
                className="form-control mb-1"
                type="text"
                placeholder={button}
                style={{ minWidth: '170px' }}
              />
              <div className="input-group input-group-sm">
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
            <div key={button}>
              <RemovableListItem
                content={buttonInput}
                elementToRemove={button}
                onClick={leftColumn ? removeButtonLeft : removeButtonRight}
              />
            </div>
          );
        })}
      </ul>
    );
  };

  ButtonInputList.propTypes = {
    buttonTitles: arrayOf(string).isRequired
  };

  return (
    <div className="m-4">
      <Navigation tabs={tabs} />
      <div className="tab-content" id="questionCreationContent">
        <div
          className="tab-pane fade show active"
          id={tabs[0]}
          role="tabpanel"
          aria-labelledby={`${tabs[0]}-tab`}
        >
          <div className="row no-gutters">
            <div className="col-md-5 col-lg-6 m-2 " style={{ border: '1px solid red' }}>
              <div className="form-inline" id="inputs">
                <div className="col px-1" style={{ border: '1px solid orange' }}>
                  <QuestionTypeSelection />
                </div>
                <div className="col px-1" style={{ border: '1px solid orange' }}>
                  <QuestionTitelInput />
                </div>
                <div className="w-100" />
                <div className="col px-1" style={{ border: '1px solid orange' }}>
                  <QuestionTitelInput />
                </div>
                <div className="col px-1" style={{ border: '1px solid orange' }}>
                  <QuestionTitelInput />
                </div>
              </div>
              <div className="row no-gutters mt-4" id="buttons">
                <div className="col my-1 text-center" style={{ border: '1px solid turquoise' }}>
                  Left
                  <ButtonInputList buttonTitles={buttonsLeft} leftColumn />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => console.log('Left button added')}
                  >
                    Add
                  </button>
                </div>
                <div className="col my-1 text-center" style={{ border: '1px solid turquoise' }}>
                  Right
                  <ButtonInputList buttonTitles={buttonsRight} />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => console.log('Rigth button added')}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="col mt-2 border border-info">
              <Question />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show "
          id={tabs[1]}
          role="tabpanel"
          aria-labelledby={`${tabs[1]}-tab`}
        >
          <div className="row">
            <div className="col">Hello World Order is Born</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreation;
