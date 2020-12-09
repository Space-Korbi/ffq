/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, string } from 'prop-types';
import Help from '../../Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from '../../Jumbotron/Jumbotron';

const FrequencyQuestion = ({ title, subtitle1, subtitle2, help, leftButtons, rightButtons }) => {
  return (
    <div>
      <div className="">
        <Jumbotron title={title} subtitle1={subtitle1} subtitle2={subtitle2} />
      </div>
      <div className="row no-gutters">
        <div className="col d-flex justify-content-end">
          <Help infoText={help} />
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col">
          <FrequencySelection leftButtons={leftButtons} rightButtons={rightButtons} />
        </div>
      </div>
    </div>
  );
};

FrequencyQuestion.propTypes = {
  title: string,
  subtitle1: string,
  subtitle2: string,
  help: string,
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired
};

FrequencyQuestion.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default FrequencyQuestion;
