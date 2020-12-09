/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';

import Jumbotron from '../Jumbotron';
import Help from '../Help';

function Question({ title, subtitle1, subtitle2, help }) {
  return (
    <div>
      <div>
        <Jumbotron title={title} subtitle1={subtitle1} subtitle2={subtitle2} />
      </div>
      {help && (
        <div className="row no-gutters">
          <div className="col d-flex justify-content-end">
            <Help infoText={help} />
          </div>
        </div>
      )}
    </div>
  );
}

Question.propTypes = {
  title: string,
  subtitle1: string,
  subtitle2: string,
  help: string
};

Question.defaultProps = {
  title: '',
  subtitle1: '',
  subtitle2: '',
  help: ''
};

export default Question;
