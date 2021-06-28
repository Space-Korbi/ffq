import React from 'react';
import { string, bool, func } from 'prop-types';

const AnswerButton = ({ title, isSelectedAnswer, color, onClick }) => {
  let buttonStyle = `btn btn-outline-${color} btn-block btn-frequency my-4`;
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
  color: string,
  isSelectedAnswer: bool,
  onClick: func.isRequired
};

AnswerButton.defaultProps = {
  color: 'primary',
  isSelectedAnswer: false
};

export default AnswerButton;
