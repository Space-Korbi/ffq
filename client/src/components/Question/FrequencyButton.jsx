import React from 'react';
import { string, func } from 'prop-types';

const FrequencyButton = ({ text, onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-primary btn-block btn-frequency my-4"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

FrequencyButton.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired
};

export default FrequencyButton;
