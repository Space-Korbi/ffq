/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import { userService } from '../../services';

// helpers
import { dateHelper } from '../../helpers';

// custom hooks
import { useFetchUsers } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import ConsentModal from '../../components/Modals';

const AccountDataPresenter = ({ user, isAdmin }) => {
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);
  const {
    id,
    email,
    firstName,
    lastName,
    startedOn,
    finishedOn,
    stoppedAtIndex,
    screeningStatus
  } = user;

  return (
    <div className="jumbotron">
      <header className="mb-4">
        <h3>
          <strong>{`${firstName} ${lastName}`}</strong>
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {email}
      </p>
      {!isAdmin && (
        <div>
          <p>
            <strong>Consent Form:</strong>
            {hasAcceptedConsentForm ? (
              <span className="badge badge-success mx-1">Accepted</span>
            ) : (
              <span className="badge badge-danger mx-1">Not accepted</span>
            )}
            {!hasAcceptedConsentForm && (
              <button
                type="button"
                className="btn btn-outline-primary "
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                View consent form
              </button>
            )}
          </p>
          <ConsentModal
            onAccept={() =>
              userService
                .updateUserData(id, { data: { hasAcceptedConsentForm: true } })
                .then((res) => {
                  setHasAcceptedConsentForm(true);
                })
            }
          />
          <p>
            <strong>Screening Status:</strong>
            {(() => {
              switch (screeningStatus) {
                case 'accept':
                  return <span className="badge badge-success mx-1">Accepted</span>;
                case 'reject':
                  return <span className="badge badge-danger mx-1">Rejected</span>;
                default:
                  return <span className="badge badge-warning mx-1">Wait</span>;
              }
            })()}
          </p>
          <p>
            <strong>FFQ started:</strong>
            {dateHelper.applyDateStyle(startedOn)}
          </p>
          <p>
            <strong>FFQ finished:</strong>
            {finishedOn ? (
              <span className="badge badge-success mx-1">{dateHelper.toDateDE(finishedOn)}</span>
            ) : (
              <span>
                <span className="badge badge-warning mx-1">Not finished.</span>The last question
                answered is
                <span className="badge badge-info mx-1">Question {stoppedAtIndex + 1}</span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

const AccountPage = ({ isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  return (
    <div>
      {isErrorUsers && (
        <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
          Something went wrong...
        </div>
      )}
      {isLoadingUsers && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner />
        </div>
      )}
      <div className="container">
        {users && users.length > 0 && <AccountDataPresenter user={users[0]} isAdmin={isAdmin} />}
      </div>
    </div>
  );
};

export default AccountPage;
