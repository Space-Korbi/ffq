import React from 'react';
import { string } from 'prop-types';
import { QuestionIcon } from '@primer/octicons-react';

const Help = ({ infoText }) => {
  return (
    <div className="text-info">
      <button
        type="button"
        className="btn text-info"
        data-container="body"
        data-toggle="popover"
        data-placement="left"
        data-content={infoText}
      >
        <QuestionIcon size="large" />
      </button>
    </div>
  );
};

Help.propTypes = {
  infoText: string.isRequired
};

export default Help;
