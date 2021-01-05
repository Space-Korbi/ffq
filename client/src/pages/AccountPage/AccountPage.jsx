import React from 'react';

// eslint-disable-next-line react/prop-types
const AccountPage = ({ firstName, lastName, email, hasAcceptedConsentForm }) => {
  return (
    <div className="container">
      <div className="jumbotron">
        <header className="mb-5">
          <h3>
            <strong>{`${firstName} ${lastName}`}</strong>
          </h3>
        </header>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Consent Form:</strong>{' '}
          {hasAcceptedConsentForm ? (
            <span className="badge badge-success">Accepted</span>
          ) : (
            <span className="badge badge-danger">Not yet accepted</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
