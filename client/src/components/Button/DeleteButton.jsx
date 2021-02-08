import React from 'react';
import { func, bool, string } from 'prop-types';
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

const DeleteButton = ({ onClick, isTrashCan, isDeleting, styling }) => {
  return (
    <button
      type="button"
      className={`btn btn-outline-danger d-flex align-items-center p-1 ${styling}`}
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
  isDeleting: bool,
  styling: string
};

DeleteButton.defaultProps = {
  isTrashCan: false,
  isDeleting: false,
  styling: ''
};

export default DeleteButton;
