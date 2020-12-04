/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, NavLink, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../../pages';
import FFQPresentation from '../FFQ';
import AdminPage from '../../pages/AdminPage';
import ParticipantPage from '../../pages/ParticipantPage';
import UserSelection from '../UserSelection';
import { Role } from '../../helpers';
import authenticationService from '../../services';

const navbarAdmin =
  'navbar navbar-expand-lg navbar-dark bg-dark fixed-top flex-nowrap d-flex justify-content-between shadow';
const navbarParticipant = 'navbar navbar-dark bg-dark fixed-top flex-nowrap shadow';

const Dashboard = ({ isAdmin }) => {
  const { path, url, params } = useRouteMatch();
  const [navigationItem, setNavigationItem] = useState('FFQ');

  /**
   * * TODO
   * Move navigation into its own component
   * Map nav items according to admin and participant
   * highlight active nav link
   */
  const adminLinks = [
    {
      name: 'Admin Panel',
      to: '/admin',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
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
    },
    {
      name: 'Create Movies',
      to: '/movies/create',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Questionnaire',
      to: '/questionnaire',
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
      <nav className={isAdmin ? navbarAdmin : navbarParticipant}>
        <button
          className={isAdmin ? 'navbar-toggler d-lg-none' : 'navbar-toggler'}
          type="button"
          data-toggle="collapse"
          data-target="#navigationMenu"
          aria-controls="navigationMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <span
          className="navbar-text"
          style={{
            color: 'beige',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {navigationItem}
        </span>
        <ul className="navbar-nav">
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
      </nav>

      <div className="container-fluid">
        <div className="row">
          {isAdmin && (
            <nav
              id="navigationMenu"
              className="navbar-light bg-light d-lg-block col-lg-2 collapse navbar-collapse"
            >
              <div className="sidebar-sticky pt-3">
                <ul className="navbar-nav p-3">
                  {adminLinks.map((link) => (
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

                <h6 className="sidebar-heading d-flex align-items-center px-3 mt-4 text-muted">
                  <span>Saved reports</span>
                </h6>
                <ul className="navbar-nav p-3">
                  <li className="nav-item">
                    <a className="nav-link" href="/#">
                      Current month
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/#">
                      Last quarter
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          )}

          {!isAdmin && (
            <nav id="navigationMenu" className="navbar-dark bg-dark collapse navbar-collapse">
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
            </nav>
          )}
          <main role="main" className="col px-sm-1 px-lg-3 mt-2">
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
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary dropdown-toggle"
                  >
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
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

export default Dashboard;
