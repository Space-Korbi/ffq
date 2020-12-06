/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes, { string } from 'prop-types';

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

const QuestionTitelInput = ({ type }) => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          {type}
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

QuestionTitelInput.propTypes = {
  type: string.isRequired
};

function QuestionTitles(props) {
  return (
    <div>
      <div className="flex-column" id="inputs">
        <QuestionTypeSelection />

        <QuestionTitelInput type="Title" />

        <QuestionTitelInput type="Subtitle" />

        <QuestionTitelInput type="Comment" />
      </div>
    </div>
  );
}

QuestionTitles.propTypes = {};

export default QuestionTitles;
