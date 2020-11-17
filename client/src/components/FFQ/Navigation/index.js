import React from 'react';
import PropTypes from 'prop-types';

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

Navigation.propTypes = {
  prevQuestion: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  canPrevQuestion: PropTypes.bool.isRequired,
  canNextQuestion: PropTypes.bool.isRequired
};

export default Navigation;
