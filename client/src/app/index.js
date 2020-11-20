/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import AuthenticationService from '../services/AuthenticationService';
import Role from '../helpers/role';

// Import my components
import Dashboard from '../components/Dashboard';

const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: Role.Admin
  },
  {
    id: 3,
    username: 'participant',
    password: 'participant',
    firstName: 'Participant',
    lastName: 'User',
    role: Role.Participant
  }
];

/**
 * * Routing
 * The Switch component will render the first route that matches that pattern.
 * Order is important. Since the router will exit as soon as it finds a match,
 * always put a more specific route before a less specific route.
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false
    };
    localStorage.setItem('currentUser', JSON.stringify(users[1]));
  }

  componentDidMount() {
    AuthenticationService.currentUser.subscribe((x) =>
      this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
      })
    );
  }

  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <div>Logged out</div>
            </Route>
            {currentUser && (
              <PrivateRoute
                path="/dashboard"
                roles={[currentUser.role]}
                isAdmin={isAdmin}
                component={Dashboard}
              />
            )}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
