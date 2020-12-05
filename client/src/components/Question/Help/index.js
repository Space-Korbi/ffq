import React from 'react';
import { string } from 'prop-types';
import { QuestionIcon } from '@primer/octicons-react';

import './Help.css';

const Help = ({ infoText }) => {
  return (
    <div className="text-info">
      <button
        type="button"
        className="btn text-info p-0"
        data-container="body"
        data-toggle="popover"
        data-placement="left"
        data-content={infoText}
      >
        <QuestionIcon size="36" />
      </button>
    </div>
  );
};

Help.propTypes = {
  infoText: string.isRequired
};

export default Help;
