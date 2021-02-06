/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { number, string } from 'prop-types';
import $ from 'jquery';
import { InfoIcon } from '@primer/octicons-react';

const Info = ({ text, size }) => {
  useEffect(() => {
    $('[data-toggle="popover"]').popover();
  }, []);

  return (
    <div>
      <a
        className="btn text-info p-0"
        tabIndex="0"
        data-container="body"
        data-toggle="popover"
        data-trigger="focus"
        data-placement="bottom"
        data-content={text}
      >
        <InfoIcon size={size} />
      </a>
    </div>
  );
};

Info.propTypes = {
  text: string.isRequired,
  size: number.isRequired
};

export default Info;
