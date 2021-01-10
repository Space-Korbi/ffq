/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import { userService } from '../../services';

// custom hooks
import { useFetchUsers } from '../../hooks';

const AccountDataPresenter = ({ user }) => {
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);
  const {
    id,
    email,
    firstName,
    lastName,
    startDate,
    endDate,
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
            className="btn btn-sm btn-outline-success"
            onClick={() =>
              userService.updateData(id, { hasAcceptedConsentForm: true }).then((res) => {
                setHasAcceptedConsentForm(res.data.hasAcceptedConsentForm);
              })
            }
          >
            Accept now
          </button>
        )}
      </p>
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
        {startDate ? (
          <span className="badge badge-success mx-1">{startDate}</span>
        ) : (
          <span className="badge badge-danger mx-1"> Has not been started </span>
        )}
      </p>
      <p>
        <strong>FFQ finished:</strong>
        {endDate ? (
          <span className="badge badge-success mx-1">{endDate}</span>
        ) : (
          <span>
            <span className="badge badge-warning mx-1">Not yet finished.</span>The last question
            answered is
            <span className="badge badge-info mx-1">Question {stoppedAtIndex + 1}</span>
          </span>
        )}
      </p>
    </div>
  );
};

const AccountPage = () => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  return (
    <div className="container">
      {isErrorUsers && (
        <div className="alert alert-danger d-flex justify-content-center" role="alert">
          Something went wrong...
        </div>
      )}
      {users && users.length ? <AccountDataPresenter user={users[0]} /> : 'Loading...'}
    </div>
  );
};

export default AccountPage;
