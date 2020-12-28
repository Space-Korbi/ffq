import React from 'react';
import { bool, func } from 'prop-types';
import { TriangleDownIcon, TriangleUpIcon } from '@primer/octicons-react';

const MoveButton = ({ onClick, up }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary d-flex align-items-center p-1 ml-1"
      onClick={onClick}
    >
      {up ? <TriangleUpIcon /> : <TriangleDownIcon />}
    </button>
  );
};

MoveButton.propTypes = {
  onClick: func.isRequired,
  up: bool
};

MoveButton.defaultProps = {
  up: false
};

export default MoveButton;
