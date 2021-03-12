import React from 'react';
import { func } from 'prop-types';
import { PencilIcon } from '@primer/octicons-react';
import $ from 'jquery';

const EditButton = ({ onClick }) => {
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
      title="Bearbeiten"
    >
      <PencilIcon />
    </button>
  );
};

EditButton.propTypes = {
  onClick: func.isRequired
};

export default EditButton;
