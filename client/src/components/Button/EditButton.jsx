import React from 'react';
import { func } from 'prop-types';
import { PencilIcon } from '@primer/octicons-react';

const EditButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary d-flex align-items-center p-1 ml-1"
      onClick={onClick}
    >
      <PencilIcon />
    </button>
  );
};

EditButton.propTypes = {
  onClick: func.isRequired
};

export default EditButton;
