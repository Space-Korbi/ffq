/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../../pages';
import { Table } from '../Table';
import FFQPresentation from '../FFQ';

const Dashboard = () => {
  const { path, url } = useRouteMatch();

  /**
   * ! Deletable Sample
   * column, data
   */

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id' // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name'
      }
    ],
    []
  );

  const data = React.useMemo(
    () => [
      { _id: '1,0', name: 'Lorem' },
      { _id: '2,0', name: 'ipsum' }
    ],
    []
  );

  const checkMyData = (row) => {
    // We also turn on the flag to not reset the page
    // eslint-disable-next-line no-console
    console.log('Row:', row);
  };

  return (
    <div className="frame">
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">
          FFQ
        </a>
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
            <a className="nav-link" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={`${url}/sample`} className="nav-link">
                    Sample
                  </Link>
                </li>
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
                  <a className="nav-link" href="#">
                    Current month
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Last quarter
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Social engagement
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Year-end sale
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
                <Route path={`${path}/sample`}>
                  <Table columns={columns} data={data} checkMyData={checkMyData} />
                </Route>
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

export default Dashboard;
