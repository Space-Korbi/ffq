/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const Submit = () => {
  return (
    <div>
      <div className="card text-center">
        <div className="card-header">Thank You!</div>
        <div className="card-body">
          <h5 className="card-title">Well Done</h5>
          <p className="card-text">You did great</p>
          <a href="#" className="btn btn-primary">
            Submit Questionnaire
          </a>
        </div>
        <div className="card-footer text-muted"> All questions answered</div>
      </div>
    </div>
  );
};

export default Submit;
