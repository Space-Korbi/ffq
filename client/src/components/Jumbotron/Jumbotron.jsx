import React from 'react';
import { string } from 'prop-types';

const Jumbotron = ({ title, subtitle, comment }) => {
  return (
    <div className="jumbotron jumbotron-fluid jumbotron-question">
      <div className="m-3">
        <h1 className="display-4">{title}</h1>
        <h5 className="lead">{subtitle}</h5>
        <hr className="my-2" />
        <h6>{comment}</h6>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
  comment: string.isRequired
};

export default Jumbotron;
