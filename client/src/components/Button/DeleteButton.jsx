import React from 'react';
import { func, bool } from 'prop-types';
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

const DeleteButton = ({ onClick, isTrashCan, isDeleting }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger d-flex align-items-center p-1 ml-1"
      onClick={onClick}
    >
      {isDeleting ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <DeleteIcon trashCan={isTrashCan} />
      )}
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  isTrashCan: bool,
  isDeleting: bool
};

DeleteButton.defaultProps = {
  isTrashCan: false,
  isDeleting: false
};

export default DeleteButton;
