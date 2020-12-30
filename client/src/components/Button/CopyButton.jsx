import React from 'react';
import { func } from 'prop-types';
import { VersionsIcon } from '@primer/octicons-react';

const CopyButton = ({ onClick }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-primary d-flex align-items-center p-1 ml-1"
      onClick={onClick}
    >
      <VersionsIcon />
    </button>
  );
};

CopyButton.propTypes = {
  onClick: func.isRequired
};

export default CopyButton;
