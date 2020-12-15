import React from 'react';
import { string, func } from 'prop-types';

const AnswerButton = ({ title, onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-primary btn-block btn-frequency my-4"
      onClick={() => onClick()}
    >
      {title}
    </button>
  );
};

AnswerButton.propTypes = {
  title: string.isRequired,
  onClick: func.isRequired
};

export default AnswerButton;
