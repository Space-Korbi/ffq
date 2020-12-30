import React from 'react';
import PropTypes from 'prop-types';

const NavigationButton = ({ disabled, move, icon }) => {
  return (
    <button
      type="button"
      className="btn btn-outline-primary"
      disabled={disabled}
      onClick={() => {
        move();
      }}
    >
      {icon}
    </button>
  );
};

NavigationButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  move: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired
};

export default NavigationButton;
