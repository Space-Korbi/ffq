import React from 'react';
import { string, bool, func } from 'prop-types';

const AnswerButton = ({ title, isSelectedAnswer, onClick }) => {
  let buttonStyle = 'btn btn-outline-primary btn-block btn-frequency my-4';
  if (isSelectedAnswer) {
    buttonStyle = 'btn btn-success btn-block btn-frequency my-4';
  }
  return (
    <button type="button" className={buttonStyle} onClick={onClick}>
      {title}
    </button>
  );
};

AnswerButton.propTypes = {
  title: string.isRequired,
  isSelectedAnswer: bool.isRequired,
  onClick: func.isRequired
};

// AnswerButton.defaultProps = { isSelectedAnswer: false };

export default AnswerButton;
