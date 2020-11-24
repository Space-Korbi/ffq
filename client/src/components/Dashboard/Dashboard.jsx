import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../../pages';
import FFQPresentation from '../FFQ';
import AdminPage from '../../pages/AdminPage';
import ParticipantPage from '../../pages/ParticipantPage';
import { Role } from '../../helpers';
import authenticationService from '../../services';

const Dashboard = ({ isAdmin }) => {
  const { path, url, params } = useRouteMatch();

  return (
    <div className="frame">
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link
          to={`/dashboard/${params.userId}`}
          className="navbar-brand col-md-3 col-lg-2 mr-0 px-3"
        >
          FFQ
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link" href="/login" onClick={() => authenticationService.logout()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                {isAdmin && (
                  <li className="nav-item">
                    <Link to={`${url}/admin`} className="nav-link">
                      Admin Panel
                    </Link>
                  </li>
                )}
                {!isAdmin && (
                  <li className="nav-item">
                    <Link to={`${url}/participant`} className="nav-link">
                      Participant Panel
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link to={`${url}/movies/list`} className="nav-link">
                    List Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${url}/movies/create`} className="nav-link">
                    Create Movie
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${url}/questionnaire`} className="nav-link">
                    Questionnaire
                  </Link>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
              </h6>
              <ul className="nav flex-column mb-2">
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
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
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
            <h2>Section title</h2>
            <div>
              <Switch>
                <PrivateRoute
                  path={`${path}/admin`}
                  roles={[Role.Admin]}
                  isAdmin={isAdmin}
                  component={AdminPage}
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
