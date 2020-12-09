/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, string } from 'prop-types';
import Help from '../../Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from '../../Jumbotron/Jumbotron';

const FrequencyAnswer = ({ leftButtons, rightButtons }) => {
  return (
    <div>
      <div className="row no-gutters">
        <div className="col">
          <FrequencySelection leftButtons={leftButtons} rightButtons={rightButtons} />
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
