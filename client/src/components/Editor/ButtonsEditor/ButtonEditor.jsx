import React, { useState } from 'react';
import { arrayOf, func, string, shape, exact } from 'prop-types';

const ButtonEditor = ({ dispatch, position, answer }) => {
  const [title, setTitle] = useState(answer.title);

  return (
    <div>
      <div className="input-group input-group-sm flex-nowrap my-2">
        <input
          type="text"
          className="form-control"
          value={title}
          aria-label="Button Title"
          aria-describedby="button-title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-sm btn-outline-secondary"
            type="button"
            id="button-title"
            onClick={() => {
              dispatch({
                type: 'changeButtonTitle',
                payload: { position, title, id: answer.id }
              });
            }}
          >
            Set title
          </button>
        </div>
      </div>

      <div className="input-group input-group-sm flex-nowrap">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Skip
          </span>
        </div>
        <input
          type="number"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
        <div className="input-group-append">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Questions
          </span>
        </div>
      </div>
    </div>
  );
};

ButtonEditor.propTypes = {
  answer: shape({
    type: string,
    options: shape({
      left: arrayOf(exact({ id: string.isRequired, title: string })),
      right: arrayOf(exact({ id: string.isRequired, title: string }))
    })
  }).isRequired,
  dispatch: func.isRequired,
  position: string.isRequired
};

export default ButtonEditor;
