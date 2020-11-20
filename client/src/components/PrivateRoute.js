/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import AuthenticationService from '../services/AuthenticationService';

// import { authenticationService } from '@/_services';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // ! set currentUser to admin
      const currentUser = AuthenticationService.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      console.log('Role 2.', roles);
      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: '/' }} />;
      }

      // authorised so return component
      return <Component {...props} roles={roles} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivateRoute;
