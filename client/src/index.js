/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

// ! Delete before production
// setup fake backend
import configureFakeBackend from './helpers/fake-backend';

const $ = require('jquery');

configureFakeBackend();

/**
 * * Strict Mode
 * StrictMode is a tool for highlighting potential problems
 * in an application. Like Fragment,
 * StrictMode does not render any visible UI.
 * It activates additional checks and warnings for its descendants.
 * Strict mode checks are run in development mode only;
 * they do not impact the production build.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
