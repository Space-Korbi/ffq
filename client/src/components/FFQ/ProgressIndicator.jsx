import React from 'react';
import PropTypes from 'prop-types';

const ProgressIndicator = (props) => {
  const { currentPosition, length } = props;
  const percentage = `${Math.round((currentPosition / length) * 100)}%`;
  return (
    <div className="mt-2">
      <div className="d-flex justify-content-center">
        <span className="badge badge-info">
          {currentPosition} of {length} answered
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
  currentPosition: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default ProgressIndicator;
