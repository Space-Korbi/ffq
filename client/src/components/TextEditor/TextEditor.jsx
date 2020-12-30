import React from 'react';
import { string, func } from 'prop-types';

const TextEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        aria-label="Title input"
        aria-describedby="title-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  value: string.isRequired,
  placeholder: string.isRequired,
  onChange: func.isRequired
};

export default TextEditor;
