import React from 'react';
import { arrayOf, string } from 'prop-types';

import FrequencyButton from './FrequencyButton';

const saveAnswer = () => {
  console.log('answer');
};

const FrequencySelection = ({ leftButtons, rightButtons }) => {
  return (
    <div className="row mx-3">
      <div className="col-6">
        {leftButtons.map((button) => (
          <div key={button}>
            <FrequencyButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightButtons.map((button) => (
          <div key={button}>
            <FrequencyButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>
    </div>
  );
};

FrequencySelection.propTypes = {
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired
};

export default FrequencySelection;
