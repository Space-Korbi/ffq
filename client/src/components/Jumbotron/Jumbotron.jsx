import React from 'react';
import { string } from 'prop-types';

/**
 * * Stateless component
 * Whenever you don't need state of lifecycle methods,
 * you should write your component as a stateless function.
 * Stateless components are in general easier to reason about.
 */

const Jumbotron = ({ title, subtitle1, subtitle2 }) => {
  return (
    <div className="jumbotron jumbotron-fluid jumbotron-question">
      <div className="m-3">
        <h1 className="display-4">{title}</h1>
        <h5>{subtitle1}</h5>
        <hr className="my-2" />
        <h5>{subtitle2}</h5>
      </div>
    </div>
  );
};

Jumbotron.propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired
};

export default Jumbotron;
