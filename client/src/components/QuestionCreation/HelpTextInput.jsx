import React from 'react';

const QuestionTypeSelection = () => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Help
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

export default QuestionTypeSelection;
