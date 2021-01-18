import React from 'react';
import { func, string } from 'prop-types';
import { PlusIcon } from '@primer/octicons-react';

const AddButton = ({ onClick, styling }) => {
  return (
    <button
      type="button"
      className={`btn btn-outline-primary d-flex align-items-center p-1 ${styling}`}
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  );
};

AddButton.propTypes = {
  onClick: func.isRequired,
  styling: string
};

AddButton.defaultProps = {
  styling: ''
};

export default AddButton;
