import React from 'react';
import { string, func, object, oneOfType } from 'prop-types';
import { X } from 'react-feather';

const DeleteButton = ({ onClick, element, Icon }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger d-flex align-items-center p-1 ml-2"
      onClick={() => onClick(element)}
    >
      <Icon size={16} />
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  element: oneOfType([string, object]).isRequired,
  Icon: oneOfType([string, object])
};

DeleteButton.defaultProps = {
  Icon: X
};

export default DeleteButton;
