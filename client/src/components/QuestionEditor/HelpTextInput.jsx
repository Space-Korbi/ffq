import React from 'react';
import { func, string } from 'prop-types';

const HelpTextInput = ({ help, onChange }) => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="help-text-input">
          Help
        </span>
      </div>
      <input
        type="text"
        value={help}
        className="form-control"
        aria-label="Help text input"
        aria-describedby="help-text"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

HelpTextInput.propTypes = {
  help: string.isRequired,
  onChange: func.isRequired
};

export default HelpTextInput;
