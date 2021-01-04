import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { authService } from '../services';
import { Role } from '../helpers';
import PrivateRoute from '../components/PrivateRoute';
import SignUpPage from '../pages/SignUpPage';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../components/Dashboard';

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
  }

  componentDidMount() {
    authService.currentUser.subscribe((x) => {
      this.setState({
        currentUser: x,
        isAdmin: x && x.roles[0] === Role.Admin
      });
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { currentUser, isAdmin } = this.state;

    return (
      <Router>
        <Switch>
          <PrivateRoute path="/user/:userId" isAdmin={isAdmin} component={Dashboard} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={LoginPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
