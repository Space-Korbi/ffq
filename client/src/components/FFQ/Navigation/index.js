/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

/**
 * TODO fix progress bar and navigation buttons
 * Progress bar needs to be full when submit page is reached
 * Nav buttons need to be enabled and disabled accordingly
 * ! Think about how to pass data and which component controlls the data. Which has what responsibility?
 */

function Navigation(props) {
  const { prevQuestion, nextQuestion, canPrevQuestion, canNextQuestion } = props;

  return (
    <div className="mt-2">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={!canPrevQuestion}
          onClick={() => {
            prevQuestion();
          }}
        >
          ←
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          disabled={!canNextQuestion}
          onClick={() => {
            nextQuestion();
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Navigation;
