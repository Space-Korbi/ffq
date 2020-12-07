/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';
import Jumbotron from './Jumbotron';
import Help from './Help';

const AmountQuestion = ({ title, subtitle, comment, help }) => {
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
    </div>
  );
};

AmountQuestion.propTypes = {
  title: string,
  subtitle: string,
  comment: string,
  help: string
};

AmountQuestion.defaultProps = {
  title: '',
  subtitle: '',
  comment: '',
  help: ''
};

export default AmountQuestion;
