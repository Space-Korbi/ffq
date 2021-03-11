import React from 'react';
import { func, bool, string, number } from 'prop-types';
import { TrashIcon, XIcon } from '@primer/octicons-react';
import $ from 'jquery';

function DeleteIcon({ trashCan, size }) {
  return trashCan ? <TrashIcon size={size} /> : <XIcon size={size} />;
}

DeleteIcon.propTypes = {
  trashCan: bool,
  size: number
};

DeleteIcon.defaultProps = {
  trashCan: false,
  size: 18
};

const DeleteButton = ({ onClick, isTrashCan, isDeleting, styling, iconSize }) => {
  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });

  return (
    <button
      type="button"
      className={`btn btn-outline-danger d-flex align-items-center p-1 ${styling}`}
      onClick={onClick}
      data-toggle="tooltip"
      data-placement="top"
      title="Löschen"
    >
      {isDeleting ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        <DeleteIcon trashCan={isTrashCan} size={iconSize} />
      )}
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  isTrashCan: bool,
  isDeleting: bool,
  styling: string,
  iconSize: number
};

DeleteButton.defaultProps = {
  isTrashCan: false,
  isDeleting: false,
  styling: '',
  iconSize: 18
};

export default DeleteButton;
