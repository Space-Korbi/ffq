import React from 'react';
import PropTypes from 'prop-types';

const ProgressIndicator = (props) => {
  const { currentQuestionID, numberOfQuestions } = props;
  const percentage = `${Math.trunc((currentQuestionID / numberOfQuestions) * 100)}%`;
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-center">
        <span className="badge badge-info">
          {currentQuestionID} of {numberOfQuestions} answered
        </span>
      </div>
      <div className="progress mt-2">
        <div
          className="progress-bar bg-info"
          role="progressbar"
          style={{ width: percentage }}
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {percentage}
        </div>
      </div>
    </div>
  );
};

ProgressIndicator.propTypes = {
  currentQuestionID: PropTypes.number.isRequired,
  numberOfQuestions: PropTypes.number.isRequired
};

export default ProgressIndicator;
