import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, NavLink, Link } from 'react-router-dom';

// helpers
import { Role } from '../../helpers';

// services
import { authService } from '../../services';

// Root Pages that can be routed to
import {
  HomePage,
  QuestionnaireEditorPage,
  QuestionnairePresenterPage,
  ParticipantsManagementPage,
  AccountPage,
  LoginPage
} from '../../pages';

// components
import PrivateRoute from '../PrivateRoute';

const Dashboard = ({ isAdmin }) => {
  const { path, url, params } = useRouteMatch();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  /**
   * * TODO
   * Move navigation into its own component
   * Map nav items according to admin and participant
   * highlight active nav link
   */
  const adminLinks = [
    {
      name: 'Editor',
      to: '/questionnaireEditor',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Preview',
      to: '/questionnairePresenter',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'User Manager',
      to: '/participantsManager',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Account',
      to: '/account',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }
  ];

  const userLinks = [
    /* {
      name: 'Questionnaire',
      to: '/questionnairePresenter',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }, */
    {
      name: 'Account',
      to: '/account',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }
  ];

  return (
    <div style={{ minWidth: '300px' }}>
      <nav
        className={
          isAdmin ? 'navbar navbar-expand-md navbar-dark bg-dark' : 'navbar navbar-dark bg-dark'
        }
      >
        <span
          className="navbar-text mr-3 p-0"
          style={{
            color: 'beige',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          <Link
            className="navbar-brand bg-transparent shadow-none p-0"
            to={`/users/${params.userId}`}
          >
            <img src="../../hi-ffq.png" width="34" height="34" alt="" loading="lazy" />
          </Link>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <div className="flex-grow-1">
            {isAdmin && (
              <div>
                <ul className="navbar-nav mr-auto">
                  {adminLinks.map((link) => (
                    <li className="nav-item" key={link.name}>
                      <NavLink
                        to={`${url}${link.to}`}
                        className={link.className}
                        activeClassName={link.activeClassName}
                        key={link.name}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!isAdmin && (
              <ul className="navbar-nav">
                {userLinks.map((link) => (
                  <li className="nav-item" key={link.name}>
                    <NavLink
                      to={`${url}${link.to}`}
                      className={link.className}
                      activeClassName={link.activeClassName}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link ml-auto" href="/login" onClick={() => authService.logout()}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" className="col p-0">
        {user && (
          <div className="row no-gutters">
            <div className="col">
              <Switch>
                <PrivateRoute
                  path={`${path}/questionnaireEditor`}
                  roles={[Role.Admin]}
                  isAdmin={isAdmin}
                  component={QuestionnaireEditorPage}
                />
                <PrivateRoute
                  path={`${path}/participantsManager`}
                  roles={[Role.Admin]}
                  isAdmin={isAdmin}
                  component={ParticipantsManagementPage}
                />
                <Route
                  path={`${path}/questionnairePresenter`}
                  component={() => <QuestionnairePresenterPage isAdmin={isAdmin} />}
                />
                <Route
                  path={`${path}/account`}
                  component={() => <AccountPage isAdmin={isAdmin} />}
                />
                <Route
                  path={`${path}/`}
                  component={() => <HomePage isAdmin={isAdmin} user={user} />}
                />
                <Route path="*" component={LoginPage} />
              </Switch>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default Dashboard;
