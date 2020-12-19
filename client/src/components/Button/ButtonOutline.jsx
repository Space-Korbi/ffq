import React from 'react';
import { func, string } from 'prop-types';

function ButtonOutline({ title, onClick }) {
  return (
    <div>
      <button type="button" className="btn btn-outline-primary" onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

ButtonOutline.propTypes = {
  title: string.isRequired,
  onClick: func.isRequired
};

export default ButtonOutline;
