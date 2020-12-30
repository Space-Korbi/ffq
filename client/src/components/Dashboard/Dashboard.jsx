/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, NavLink, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../../pages';
import QuestionnairePresentation from '../Questionnaire';
import AdminPage from '../../pages/AdminPage';
import ParticipantPage from '../../pages/ParticipantPage';
import AccountPage from '../../pages/AccountPage';
import WelcomePage from '../../pages/WelcomePage';
import UserSelection from '../UserSelection';
import QuestionEditor from '../QuestionEditor';
import QuestionnaireEditor from '../QuestionnaireEditor';
import { Role } from '../../helpers';
import { authenticationService } from '../../services';

const Dashboard = ({ isAdmin }) => {
  const { path, url, params } = useRouteMatch();
  const [navigationItem, setNavigationItem] = useState('FFQ');

  /**
   * * TODO
   * Move navigation into its own component
   * Map nav items according to admin and participant
   * highlight active nav link
   */
  const adminLinksQuestionnaires = [
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
    },
    {
      name: 'Question Editor',
      to: '/QuestionEditor',
      className: 'nav-link',
      activeClassName: 'nav-link active'
    },
    {
      name: 'Questionnaire Editor',
      to: '/QuestionnaireEditor',
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
    <div style={{ minWidth: '300px' }}>
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
            className="navbar-text mr-3"
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
              <div>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <div className="dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="dropdownMenuButton1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Questionnaire
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        {adminLinksQuestionnaires.map((link) => (
                          <a className="dropdown-item" href={`${url}${link.to}`} key={link.name}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>

                  <li className="nav-item dropdown">
                    <div className="dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Participants
                      </a>
                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {adminLinksParticipants.map((link) => (
                          <a className="dropdown-item" href={`${url}${link.to}`} key={link.name}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {!isAdmin && (
              <ul className="navbar-nav">
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
        </div>
      </nav>
      <main role="main" className="col p-0">
        <div className="row no-gutters">
          <div className="col">
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
              <PrivateRoute
                path={`${path}/QuestionEditor`}
                roles={[Role.Admin]}
                isAdmin={isAdmin}
                component={QuestionEditor}
              />
              <PrivateRoute
                path={`${path}/QuestionnaireEditor`}
                roles={[Role.Admin]}
                isAdmin={isAdmin}
                component={QuestionnaireEditor}
              />
              <Route path={`${path}/movies/list/movies/update/:id`} component={MoviesUpdate} />
              <Route path={`${path}/movies/list`} component={MoviesList} />
              <Route path={`${path}/movies/create`} component={MoviesInsert} />
              <Route path={`${path}/questionnaire`} component={QuestionnairePresentation} />

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
