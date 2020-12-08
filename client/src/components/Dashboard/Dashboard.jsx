/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, NavLink, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../../pages';
import FFQPresentation from '../FFQ';
import AdminPage from '../../pages/AdminPage';
import ParticipantPage from '../../pages/ParticipantPage';
import AccountPage from '../../pages/AccountPage';
import WelcomePage from '../../pages/WelcomePage';
import UserSelection from '../UserSelection';
import { Role } from '../../helpers';
import authenticationService from '../../services';

const Dashboard = ({ isAdmin }) => {
  const { path, url, params } = useRouteMatch();
  const [navigationItem, setNavigationItem] = useState('FFQ');

  /**
   * * TODO
   * Move navigation into its own component
   * Map nav items according to admin and participant
   * highlight active nav link
   */
  const adminLinksFFQs = [
    {
      name: 'Admin Panel',
      to: '/admin',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Questionnaire',
      to: '/questionnaire',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Create Movies',
      to: '/movies/create',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }
  ];

  const adminLinksParticipants = [
    {
      name: 'User Selection',
      to: '/UserSelection',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Movies List',
      to: '/movies/list',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    }
  ];

  const participantLinks = [
    {
      name: 'Paricipant Panel',
      to: '/participant',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Questionnaire',
      to: '/questionnaire',
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

  return (
    <div>
      <nav
        className={
          isAdmin ? 'navbar navbar-expand-md navbar-dark bg-dark' : 'navbar navbar-dark bg-dark'
        }
      >
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
          <span
            className="navbar-text  p-3"
            style={{
              color: 'beige',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {navigationItem}
          </span>
          <div className="flex-grow-1">
            {isAdmin && (
              <ul className="navbar-nav p-3">
                {adminLinksFFQs.map((link) => (
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
            {!isAdmin && (
              <ul className="navbar-nav p-3">
                {participantLinks.map((link) => (
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
          <ul className="navbar-nav p-3">
            <li className="nav-item">
              <a
                className="nav-link ml-auto"
                href="/login"
                onClick={() => authenticationService.logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main role="main" className="col px-sm-1 px-lg-5 mt-2">
        <div className="col">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Share
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  Export
                </button>
              </div>
              <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                This week
              </button>
            </div>
          </div>

          <div>
            <Switch>
              <PrivateRoute
                path={`${path}/admin`}
                roles={[Role.Admin]}
                isAdmin={isAdmin}
                component={AdminPage}
              />
              <PrivateRoute
                path={`${path}/UserSelection`}
                roles={[Role.Admin]}
                isAdmin={isAdmin}
                component={UserSelection}
              />
              <PrivateRoute
                path={`${path}/participant`}
                roles={[Role.Participant]}
                isAdmin={isAdmin}
                component={ParticipantPage}
              />
              <Route path={`${path}/movies/list/movies/update/:id`} component={MoviesUpdate} />
              <Route path={`${path}/movies/list`} component={MoviesList} />
              <Route path={`${path}/movies/create`} component={MoviesInsert} />
              <Route path={`${path}/questionnaire`} component={FFQPresentation} />

              <Route path={`${path}/account`} component={AccountPage} />
              <Route path={`${path}/`} exact component={WelcomePage} />
            </Switch>
          </div>
        </div>
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default Dashboard;
