import React from 'react';
import { func, string } from 'prop-types';
import { PlusIcon } from '@primer/octicons-react';
import $ from 'jquery';

const AddButton = ({ onClick, styling, tooltip }) => {
  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });
  return (
    <button
      type="button"
      className={`btn d-flex align-items-center p-1 ${styling}`}
      onClick={onClick}
      data-toggle="tooltip"
      data-placement="top"
      title={tooltip}
    >
      <PlusIcon />
    </button>
  );
};

AddButton.propTypes = {
  onClick: func.isRequired,
  styling: string,
  tooltip: string
};

AddButton.defaultProps = {
  styling: '',
  tooltip: 'Hinzufügen'
};

export default AddButton;
