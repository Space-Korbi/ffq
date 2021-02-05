/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';
import { difference } from 'lodash';

// hooks
import { useFetchQuestionnaires } from '../../../hooks';

// services
import { userService } from '../../../services';

// components
import Spinner from '../../../components/Spinner';
import ConsentModal from '../../../components/Modals';

const getNextInterval = (iterations) => {
  const now = moment().toDate();
  const upcomingIteration = iterations.filter((iteration) => {
    if (
      moment(now).isSameOrBefore(iteration.start, 'day') ||
      moment(now).isSameOrBefore(iteration.end, 'day')
    ) {
      return true;
    }
    return false;
  });

  return upcomingIteration;
};

const getFinishedIterations = (user) => {
  const finishedIterations = user.iterations.filter((iteration) => {
    return moment(iteration.finishedAt) < moment().toDate();
  });
  return finishedIterations;
};

const updateJumbotron = (iterations, user) => {
  const now = moment().toDate();
  const updated = {
    currentIteration: {},
    title: '',
    daysTilStart: '',
    accessInformation: '',
    disabled: false,
    buttonTitle: 'Umfrage Starten'
  };

  const nextIntervals = getNextInterval(iterations);
  const finishedIterations = getFinishedIterations(user);

  if (!nextIntervals.length) {
    return {
      ...updated,
      title: 'Die Umfrage ist abgeschlossen.\n \nVielen Dank für Ihre Teilnahme.',
      disabled: true
    };
  }

  const userHasFinishedIteration = (iteration) => {
    if (finishedIterations.find((finishedIteration) => finishedIteration.id === iteration.id)) {
      return true;
    }
    return false;
  };

  const nextIteration = nextIntervals.find((iteration) => {
    return !userHasFinishedIteration(iteration);
  });

  if (!nextIteration) {
    return {
      ...updated,
      title: 'Die Umfrage ist abgeschlossen.\n \nVielen Dank für Ihre Teilnahme.',
      disabled: true
    };
  }
  updated.accessInformation = `Die Umfrage kann vom ${nextIteration.startLabel} bis zum ${nextIteration.endLabel} ausgefüllt werden.`;

  if (moment(now).isBefore(nextIteration.start, 'day')) {
    return {
      ...updated,
      title: 'Die nächste Umfrage beginnt',
      daysTilStart: moment(nextIteration.start).fromNow(),
      currentIteration: nextIteration,
      disabled: true
    };
  }
  if (
    moment(now).isSameOrAfter(nextIteration.start, 'day') &&
    moment(now).isSameOrBefore(nextIteration.end, 'day')
  ) {
    // get current unfinished iteration by getting difference between all iterations and finished iterations
    const unfinishedIteration = difference(user.iterations, finishedIterations)[0];
    // check if iteration has been started before
    if (unfinishedIteration && moment(now).isSameOrAfter(unfinishedIteration.startedAt, 'day')) {
      updated.buttonTitle = 'Umfrage fortsetzen';
    }
    return {
      ...updated,
      currentIteration: nextIteration,
      disabled: false
    };
  }

  return updated;
};

const ParticipantPage = ({ user }) => {
  moment.locale('de');

  // fetch data
  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires(null, 'iterations consentScript');

  console.log('---------', fetchedQuestionnaires);
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState();
  const [iterationId, setIterationId] = useState();
  const [title, setTitle] = useState('');
  const [daysTilStart, setDaysTilStart] = useState('');
  const [accessInformation, setAccessInformation] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Umfrage starten');
  const [disabled, setDisabled] = useState();
  const history = useHistory();
  const { userId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (fetchedQuestionnaires && fetchedQuestionnaires[0]) {
      setCurrentQuestionnaire(fetchedQuestionnaires[0]);
    }
  }, [fetchedQuestionnaires]);

  useEffect(() => {
    if (currentQuestionnaire) {
      const current = updateJumbotron(currentQuestionnaire.iterations, user);
      setIterationId(current.currentIteration.id);
      setDisabled(current.disabled);
      setTitle(current.title);
      setDaysTilStart(current.daysTilStart);
      setAccessInformation(current.accessInformation);
      setButtonTitle(current.buttonTitle);
    }
  }, [currentQuestionnaire]);

  const start = async () => {
    await userService
      .updateUserIteration(userId, iterationId, { startedAt: moment().toDate() })
      .then(() => {
        history.push(`${url}/questionnairePresenter/iteration/${iterationId}`);
      });
  };

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
        <div className="d-flex justify-content-center p-4 p-sm-5">
          <div className="text-center " style={{ maxWidth: '800px' }}>
            <p className="display-4 my-5">Willkommen</p>
            <h4 className="" style={{ whiteSpace: 'pre-wrap' }}>
              {title}
            </h4>
            <h2 className="my-3">
              <span className="badge badge-secondary">{daysTilStart}</span>
            </h2>
            <p className="lead mt-5">{accessInformation}</p>
            <hr className="my-4" />
            <div className="text-center">
              {user.hasAcceptedConsentForm ? (
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
            <ConsentModal
              consentScript={currentQuestionnaire.consentScript}
              onAccept={() =>
                userService.updateUserData(userId, { hasAcceptedConsentForm: true }).then(() => {
                  userService
                    .updateUserIteration(userId, iterationId, {
                      iterationId,
                      startedAt: moment().toDate()
                    })
                    .then(() => {
                      history.push(`${url}/questionnairePresenter/iteration/${iterationId}`);
                    });
                })
              }
            />
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
