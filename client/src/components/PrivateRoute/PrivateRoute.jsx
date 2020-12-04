/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import authenticationService from '../../services';

/**
 * * PrivateRoute
 * A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 */
const PrivateRoute = ({ location, roles, isAdmin, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: `/dashboard/${currentUser.id}` }} />;
        }

        // authorised so return dashboard as admin
        return <Component isAdmin={isAdmin} />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
  location: PropTypes.shape({
    key: string,
    pathname: string,
    search: string,
    hash: string
  })
};

PrivateRoute.defaultProps = {
  roles: null,
  isAdmin: false,
  location: {
    key: '',
    pathname: '/',
    search: '',
    hash: ''
  }
};

export default PrivateRoute;
