import React from 'react';
import { string, func } from 'prop-types';

const TextEditor = ({ title, onChange }) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        aria-label="Title input"
        aria-describedby="title-input"
        value={title}
        placeholder="Title"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  title: string.isRequired,
  onChange: func.isRequired
};

export default TextEditor;
