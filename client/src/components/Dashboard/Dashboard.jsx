import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

// helpers
import { Role } from '../../helpers';

// services
import { questionnaireService } from '../../services';

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
import NavBar from './NavBar';

const Dashboard = ({ isAdmin }) => {
  const { path } = useRouteMatch();
  const [user, setUser] = useState();
  const [questionnaireMetaData, setQuestionnaireMetaData] = useState();

  useEffect(() => {
    let didCancel = false;
    const fetchMetaData = async () => {
      await questionnaireService
        .fetchQuestionnaires('metaData')
        .then((response) => {
          if (!didCancel) {
            if (response.metaData) {
              setQuestionnaireMetaData(response.metaData[0]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchMetaData();
    return () => {
      didCancel = true;
    };
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const DefaultNavBarContainer = () => {
    return (
      <>
        <NavBar isAdmin={isAdmin} />
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
          path={`${path}/account`}
          component={() => (
            <AccountPage isAdmin={isAdmin} consentScript={questionnaireMetaData.consentScript} />
          )}
        />
        <Route
          exact
          path={`${path}/`}
          component={() => (
            <HomePage isAdmin={isAdmin} questionnaireMetaData={questionnaireMetaData} />
          )}
        />
      </>
    );
  };

  return (
    <div style={{ minWidth: '300px' }}>
      <main role="main" className="col p-0">
        {user && questionnaireMetaData && (
          <div className="row no-gutters">
            <div className="col">
              <Switch>
                <Route
                  path={`${path}/questionnairePresenter`}
                  component={() => <QuestionnairePresenterPage isAdmin={isAdmin} />}
                />
                <Route exact component={DefaultNavBarContainer} />
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
