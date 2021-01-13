import React from 'react';
import { string } from 'prop-types';

function Spinner({ className }) {
  return (
    <div className={className} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

Spinner.propTypes = {
  className: string
};

Spinner.defaultProps = {
  className: 'spinner-border text-dark'
};

export default Spinner;
