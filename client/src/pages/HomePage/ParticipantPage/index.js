/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';

// hooks
import { useFetchQuestionnaires } from '../../../hooks';

// services
import { userService } from '../../../services';

// components
import Spinner from '../../../components/Spinner';
import QuestionnaireInfo from './QuestionnaireInfo';
import UserApproval from './UserApproval';

const ParticipantPage = ({ user }) => {
  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires(null, 'iterations consentScript selectionCriteria screeningRules');

  const [currentQuestionnaire, setCurrentQuestionnaire] = useState();
  const [iterationId, setIterationId] = useState();
  const [buttonTitle, setButtonTitle] = useState('Fragebogen starten');
  const [disabled, setDisabled] = useState();
  const [screeningStatus, setScreeningStatus] = useState(user.screeningStatus);
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);
  const history = useHistory();
  const { userId } = useParams();
  const { url } = useRouteMatch();

  const start = async () => {
    await userService
      .updateUserIteration(userId, iterationId, { startedAt: moment().toDate() })
      .then(() => {
        history.push(`${url}/questionnairePresenter/iteration/${iterationId}`);
      });
  };

  useEffect(() => {
    if (screeningStatus === 'Wait' || screeningStatus === 'Reject') {
      setDisabled(true);
    }
  }, [disabled]);

  useEffect(() => {
    if (fetchedQuestionnaires && fetchedQuestionnaires[0]) {
      setCurrentQuestionnaire(fetchedQuestionnaires[0]);
    }
  }, [fetchedQuestionnaires]);

  return (
    <div>
      {isErrorQuestionnaires && (
        <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
          Something went wrong...
        </div>
      )}
      {isLoadingQuestionnaires && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner />
        </div>
      )}
      {currentQuestionnaire && (
        <div className="p-4 p-sm-5 d-flex-block">
          <div className="row text-center">
            <div className="col d-flex-block">
              <QuestionnaireInfo
                iterationsProp={currentQuestionnaire.iterations}
                userProp={user}
                setDisabled={setDisabled}
                setButtonTitle={setButtonTitle}
                setIterationId={setIterationId}
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col d-flex-block">
              {hasAcceptedConsentForm && screeningStatus === 'Accept' ? (
                <button
                  disabled={disabled}
                  type="button"
                  className="btn btn-lg btn-primary mt-3"
                  onClick={() => {
                    start();
                  }}
                >
                  {buttonTitle}
                </button>
              ) : (
                <button
                  disabled={disabled}
                  type="button"
                  className="btn btn-lg btn-primary mt-3"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  {buttonTitle}
                </button>
              )}
            </div>
          </div>
          <div className="row text-center">
            <div className="col d-flex-block">
              <UserApproval
                user={user}
                screeningStatus={screeningStatus}
                setScreeningStatus={setScreeningStatus}
                setHasAcceptedConsentForm={setHasAcceptedConsentForm}
                questionnaire={currentQuestionnaire}
                start={start}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ParticipantPage.propTypes = {
  user: shape({}).isRequired
};

export default ParticipantPage;
