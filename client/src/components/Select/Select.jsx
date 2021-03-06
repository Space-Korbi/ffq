import React from 'react';
import { func, string } from 'prop-types';

import AnswerType from '../../types';

const Select = ({ onChange, dispatch, value }) => {
  const setValue = () => {
    switch (value) {
      case AnswerType.Frequency:
        return AnswerType.Frequency;
      case AnswerType.Amount:
        return AnswerType.Amount;
      case AnswerType.UserInput:
        return AnswerType.UserInput;
      case 'images':
        return 'images';
      default:
        return 'select';
    }
  };

  return (
    <>
      <div className="input-group my-2">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="select">
            Answer Type
          </label>
        </div>
        <select
          className="custom-select"
          id="select"
          value={setValue()}
          onChange={(e) => {
            onChange(e.target.value);
            dispatch({
              type: 'setDefaultState',
              payload: { answerType: e.target.value }
            });
          }}
        >
          <option value="select">Select...</option>
          <option value={AnswerType.Frequency}>Buttons</option>
          <option value={AnswerType.Amount}>Cards</option>
          <option value={AnswerType.UserInput}>User Input</option>
          <option value="images">Images</option>
        </select>
      </div>
    </>
  );
};

Select.propTypes = {
  onChange: func.isRequired,
  dispatch: func.isRequired,
  value: string.isRequired
};

export default Select;
