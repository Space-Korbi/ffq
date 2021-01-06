/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import { userService } from '../../services';

const AccountPage = () => {
  const { userId } = useParams();
  const [accountInfo, setAccountInfo] = useState();

  useEffect(() => {
    let mounted = true;
    const fetchMetaData = async () => {
      const userMetaData = await userService.getMetaData(userId);
      if (mounted) {
        setAccountInfo(userMetaData.data.data);
      }
    };

    if (!accountInfo) {
      fetchMetaData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="container">
      {accountInfo && (
        <div className="jumbotron">
          <header className="mb-4">
            <h3>
              <strong>{`${accountInfo.firstName} ${accountInfo.lastName}`}</strong>
            </h3>
          </header>
          <p>
            <strong>Email:</strong> {accountInfo.email}
          </p>
          <p>
            <strong>Consent Form:</strong>
            {accountInfo.hasAcceptedConsentForm ? (
              <span className="badge badge-success mx-1">Accepted</span>
            ) : (
              <span className="badge badge-danger mx-1">Has not been accepted</span>
            )}
          </p>
          <p>
            <strong>FFQ started:</strong>
            {accountInfo.startDate ? (
              <span className="badge badge-success mx-1">{accountInfo.startDate}</span>
            ) : (
              <span className="badge badge-danger mx-1"> Has not been started </span>
            )}
          </p>
          <p>
            <strong>FFQ finished:</strong>
            {accountInfo.endDate ? (
              <span className="badge badge-success mx-1">{accountInfo.endDate}</span>
            ) : (
              <span>
                <span className="badge badge-warning mx-1">Not yet finished.</span>The last question
                answered is
                <span className="badge badge-info mx-1">
                  Question {accountInfo.stoppedAtIndex + 1}
                </span>
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
