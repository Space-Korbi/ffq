/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, string } from 'prop-types';
import Help from './Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from './Jumbotron';

const FrequencyQuestion = ({ title, subtitle, comment, help, leftButtons, rightButtons }) => {
  return (
    <div>
      <div className="">
        <Jumbotron title={title} subtitle={subtitle} comment={comment} />
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
  subtitle: string,
  comment: string,
  help: string,
  leftButtons: arrayOf(string).isRequired,
  rightButtons: arrayOf(string).isRequired
};

FrequencyQuestion.defaultProps = {
  title: '',
  subtitle: '',
  comment: '',
  help: ''
};

export default FrequencyQuestion;
