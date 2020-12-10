import React from 'react';
import { string } from 'prop-types';

const Jumbotron = ({ title, subtitle1, subtitle2 }) => {
  return (
    <div className="jumbotron jumbotron-fluid jumbotron-question">
      <div className="m-3">
        <h1 className="display-4">{title}</h1>
        <h5 className="lead">{subtitle1}</h5>
        <hr className="my-2" />
        <h6>{subtitle2}</h6>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired
};

export default Jumbotron;
