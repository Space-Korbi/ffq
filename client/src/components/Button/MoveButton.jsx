import React from 'react';
import { bool, func } from 'prop-types';
import { TriangleDownIcon, TriangleUpIcon } from '@primer/octicons-react';
import $ from 'jquery';

const MoveButton = ({ onClick, up }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary d-flex align-items-center p-1 ml-1"
      onClick={() => {
        $('[data-toggle="tooltip"]').tooltip('hide');
        return onClick();
      }}
      data-toggle="tooltip"
      data-placement="top"
      title="Bewegen"
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
