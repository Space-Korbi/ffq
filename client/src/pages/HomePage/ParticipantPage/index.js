/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';

// services
import { userService } from '../../../services';

// helpers
import { dateHelper } from '../../../helpers';

// components
import ConsentModal from '../../../components/Modals';

const intervals = [
  { startDate: new Date('2021-01-09 23:00:00.000Z'), endDate: new Date('2021-02-06 23:00:00.000Z') }
];

const ParticipantPage = ({ user }) => {
  const [header, setHeader] = useState('Willkommen');
  const [title, setTitle] = useState(
    `Um die Umfrage zu starten klicken Sie bitte auf "Umfrage starten"`
  );
  const [buttonTitle, setButtonTitle] = useState('Umfrage starten');
  const [disabled, setDisabled] = useState();
  const history = useHistory();
  const { userId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const { startDate } = intervals[0];
    const { endDate } = intervals[0];

    if (!dateHelper.hasPassed(startDate)) {
      setTitle(`Die Umfrage kann am ${dateHelper.toDateDE(startDate)} gestartet werden`);
      setDisabled(true);
    }
    if (dateHelper.isBetween(startDate, endDate)) {
      if (Date.now > user.finishedOn) {
        setDisabled(true);
        setHeader('Die Umfrage ist abgeschlossen.');
        setTitle('Vielen Dank für Ihre Teilnahme.');
        setButtonTitle('Umfrage starten');
      } else if (user.stoppedAtIndex !== -1) {
        setHeader('Willkommen zurück!');
        setTitle(`Um die Umfrage fortzusetzen klicken Sie bitte auf "Umfrage fortsetzen"`);
        setButtonTitle('Umfrage fortsetzen');
      }
    }
  }, []);

  const start = () => {
    userService.updateUserData(userId, { data: { startedOn: Date.now() } });
    history.push(`${url}/questionnairePresenter`);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="jumbotron text-center" style={{ maxWidth: '800px' }}>
        <h1 className="display-4">{header}</h1>
        <p className="lead">{title}</p>
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
