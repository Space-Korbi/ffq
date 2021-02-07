/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { string } from 'prop-types';
import $ from 'jquery';
import { QuestionIcon } from '@primer/octicons-react';

const Help = ({ infoText }) => {
  useEffect(() => {
    $('[data-toggle="popover"]').popover();
  }, []);

  return (
    <div className="text-info mx-4 my-1">
      <a
        className="btn text-info p-0"
        tabIndex="0"
        data-container="body"
        data-toggle="popover"
        data-trigger="focus"
        data-placement="bottom"
        data-content={infoText}
      >
        <QuestionIcon size="40" />
      </a>
    </div>
  );
};

Help.propTypes = {
  infoText: string.isRequired
};

export default Help;
