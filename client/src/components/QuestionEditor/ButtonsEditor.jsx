/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, shape } from 'prop-types';
import { nanoid } from 'nanoid';

import RemovableListItem from '../List';
import { addValidButton } from '../../helpers';

const ButtonColumn = ({ answers, removeButton }) => {
  return (
    <ul className="list-group">
      {answers.map((answer) => {
        const buttonInput = (
          <div>
            <input className="form-control mb-1" type="text" placeholder={answer.title} readOnly />
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
            key={answer.title}
            content={buttonInput}
            elementToRemove={answer.title}
            onClick={removeButton}
          />
        );
      })}
    </ul>
  );
};

ButtonColumn.propTypes = {
  answers: arrayOf(shape({ key: string.isRequired, title: string })),
  removeButton: func.isRequired
};
ButtonColumn.defaultProps = {
  answers: []
};

const ButtonsEditor = ({ answers, onChange }) => {
  const [leftAnswers, setLeftAnswers] = useState(answers.options[0]);
  const [rightAnswers, setRightAnswers] = useState(answers.options[1]);

  useEffect(() => {
    const answerOptions = {
      type: answers.type,
      options: [leftAnswers, rightAnswers]
    };
    onChange(answerOptions);
  }, [leftAnswers, rightAnswers]);

  const removeButtonLeft = (titleToRemove) => {
    setLeftAnswers(leftAnswers.filter((answer) => answer.title !== titleToRemove));
  };

  const removeButtonRight = (titleToRemove) => {
    setRightAnswers(rightAnswers.filter((answer) => answer.title !== titleToRemove));
  };

  return (
    <div className="row no-gutters mt-4" id="buttons">
      <div className="col-lg-12 col-md-6 p-1 text-center">
        Left
        <ButtonColumn answers={leftAnswers} removeButton={removeButtonLeft} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addValidButton(
              { key: nanoid(), title: e.target.buttonsLeft.value },
              leftAnswers,
              setLeftAnswers
            );
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
        <ButtonColumn answers={rightAnswers} removeButton={removeButtonRight} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addValidButton(
              { key: nanoid(), title: e.target.buttonsRight.value },
              rightAnswers,
              setRightAnswers
            );
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

ButtonsEditor.propTypes = {
  answers: shape({
    type: string,
    options: arrayOf(arrayOf(shape({ key: string.isRequired, title: string })))
  }).isRequired,
  onChange: func.isRequired
};

export default ButtonsEditor;
