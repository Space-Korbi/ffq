import React from 'react';
import { string, func, object, bool, oneOfType } from 'prop-types';
import { TrashIcon, XIcon } from '@primer/octicons-react';

function DeleteIcon({ trashCan }) {
  return trashCan ? <TrashIcon /> : <XIcon />;
}

DeleteIcon.propTypes = {
  trashCan: bool
};

DeleteIcon.defaultProps = {
  trashCan: false
};

const DeleteButton = ({ onClick, element, isTrashCan }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger d-flex align-items-center p-1 ml-2"
      onClick={() => onClick(element)}
    >
      <DeleteIcon trashCan={isTrashCan} />
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  element: oneOfType([string, object]).isRequired,
  isTrashCan: bool
};

DeleteButton.defaultProps = {
  isTrashCan: false
};

export default DeleteButton;
