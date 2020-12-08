import { func } from 'prop-types';
import React from 'react';

const HelpTextInput = ({ onChange }) => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="help-text-input">
          Help
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Help text input"
        aria-describedby="help-text"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

HelpTextInput.propTypes = {
  onChange: func.isRequired
};

export default HelpTextInput;
