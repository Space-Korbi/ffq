/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchUsers } from '../../hooks';

const AccountDataPresenter = ({ user }) => {
  console.log(user);
  const { firstName, lastName, hasAcceptedConsentForm } = user.accountData;
  const { email, startDate, endDate, stoppedAtIndex, isAccepted } = user;

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
          <span className="badge badge-danger mx-1">Has not been accepted</span>
        )}
      </p>
      <p>
        <strong>FFQ started:</strong>
        {isAccepted ? (
          <span className="badge badge-success mx-1">{isAccepted}</span>
        ) : (
          <span className="badge badge-danger mx-1">Rejected</span>
        )}
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
