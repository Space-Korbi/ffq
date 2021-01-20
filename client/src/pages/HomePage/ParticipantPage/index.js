/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';

// services
import { userService } from '../../../services';

// helpers
import { dateHelper } from '../../../helpers';

// components
import ConsentModal from '../../../components/Modals';

const updateJumbotron = (intervals, user) => {
  let title = '';
  let daysTilStart = '';
  let accessInformation = '';
  let disabled = false;

  const today = moment().toDate();

  const upcomingIntervals = intervals.filter((interval) => {
    if (
      moment(today).isSameOrBefore(interval.start) ||
      moment(today).isSameOrBefore(interval.end)
    ) {
      return true;
    }
    return false;
  });

  if (!upcomingIntervals[0]) {
    title = 'Die Umfrage ist abgeschlossen. Vielen Dank für Ihre Teilnahme.';
    disabled = true;
  }
  const nextInterval = upcomingIntervals[0];
  accessInformation = `Die Umfrage kann vom ${moment(nextInterval.start).format(
    'DD.MM.YY'
  )} bis zum ${moment(nextInterval.end).format('DD.MM.YY')} ausgefüllt werden.`;

  if (moment(today).isSameOrBefore(nextInterval.start)) {
    title = 'Die nächste Umfrage beginnt';
    daysTilStart = moment(nextInterval.start).fromNow();
    disabled = true;
  } else {
    title = `Um die Umfrage zu starten klicken Sie bitte auf "Umfrage starten"`;
    disabled = false;
  }

  return { title, daysTilStart, accessInformation, disabled };
};

const ParticipantPage = ({ user, questionnaireData }) => {
  moment.locale('de');
  const [title, setTitle] = useState('');
  const [daysTilStart, setDaysTilStart] = useState('');
  const [accessInformation, setAccessInformation] = useState('');
  const [buttonTitle, setButtonTitle] = useState('Umfrage starten');
  const [disabled, setDisabled] = useState();
  const history = useHistory();
  const { userId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const current = updateJumbotron(questionnaireData.accessIntervals);
    setDisabled(current.disabled);
    setTitle(current.title);
    setDaysTilStart(current.daysTilStart);
    setAccessInformation(current.accessInformation);

    if (Date.now > user.finishedOn) {
      setDisabled(true);
      setButtonTitle('Umfrage starten');
    } else if (user.stoppedAtIndex !== -1) {
      setTitle(`Um die Umfrage fortzusetzen klicken Sie bitte auf "Umfrage fortsetzen"`);
      setButtonTitle('Umfrage fortsetzen');
    }
  }, []);

  const start = () => {
    userService.updateUserData(userId, { data: { startedOn: Date.now() } });
    history.push(`${url}/questionnairePresenter`);
  };

  return (
    <div className="d-flex justify-content-center p-4 p-sm-5">
      <div className="text-center" style={{ maxWidth: '800px' }}>
        <p className="display-4 my-5">Willkommen</p>
        <h4 className="">{title}</h4>
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
              type="button"
              className="btn btn-outline-primary "
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              {buttonTitle}
            </button>
          )}
        </div>
        <ConsentModal
          consentScript={questionnaireData.consentScript}
          onAccept={() =>
            userService
              .updateUserData(user.id, { data: { hasAcceptedConsentForm: true } })
              .then((res) => {
                userService.updateUserData(userId, { data: { startedOn: Date.now() } });
                history.push(`${url}/questionnairePresenter`);
              })
          }
        />
      </div>
    </div>
  );
};

ParticipantPage.propTypes = {
  user: shape({}).isRequired
};

export default ParticipantPage;
