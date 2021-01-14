import React from 'react';
import PropTypes from 'prop-types';

const ProgressIndicator = ({ currentPosition, length }) => {
  const percentage = `${Math.round((currentPosition / length) * 100)}%`;
  return (
    <div className="d-flex flex-grow-1">
      <div className="progress d-flex flex-fill">
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
