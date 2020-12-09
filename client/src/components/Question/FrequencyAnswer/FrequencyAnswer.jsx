/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, string } from 'prop-types';
import AnswerButtons from './AnswerButtons';

const FrequencyAnswer = ({ leftButtons, rightButtons }) => {
  return (
    <div>
      <div className="row no-gutters">
        <div className="col">
          <AnswerButtons leftButtons={leftButtons} rightButtons={rightButtons} />
        </div>
      </div>
    </div>
  );
};

FrequencyAnswer.propTypes = {
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired
};

export default FrequencyAnswer;
