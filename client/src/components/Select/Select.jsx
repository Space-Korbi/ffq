import React from 'react';
import { func } from 'prop-types';

import { AnswerType } from '../../helpers';

const Select = ({ onChange, dispatch }) => {
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
          onChange={(e) => {
            onChange(e.target.value);
            dispatch({
              type: 'setDefaultState',
              payload: { answerType: e.target.value }
            });
          }}
        >
          <option defaultValue>Choose...</option>
          <option value={AnswerType.Frequency}>Buttons</option>
          <option value={AnswerType.Amount}>Cards</option>
          <option value={AnswerType.UserInput}>User Input</option>
        </select>
      </div>
    </>
  );
};

Select.propTypes = { onChange: func.isRequired, dispatch: func.isRequired };

export default Select;
