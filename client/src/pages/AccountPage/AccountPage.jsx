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

const AccountDataPresenter = ({ user, isAdmin, consentScript }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);

  const { id, email, startedOn, finishedOn, stoppedAtIndex, screeningStatus } = user;

  const handleEdit = () => {
    if (isEditing) {
      console.log('Heyyy');
      // userService.updateUserData({ firstName, lastName });
    }
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div className="row no-gutters">
        <div className="col">
          <div className="mt-5">
            <div className="d-flex flex-row align-items-end justify-content-between">
              <p className="align-bottom m-0 mb-1 lead">Personal Information</p>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm ml-auto mb-auto"
                onClick={() => {
                  handleEdit();
                }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <div className="col-lg-4 mb-2 mb-lg-0">
              <div className="form-group mb-lg-0">
                <label htmlFor="inputFirstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  value={firstName}
                  disabled={!isEditing}
                  onChange={(e) => setFirstName(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-2 mb-lg-0">
              <div className="form-group mb-lg-0">
                <label htmlFor="inputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  value={lastName}
                  disabled={!isEditing}
                  onChange={(e) => setLastName(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-lg-0">
              <div className="form-group mb-0">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail"
                  value={email}
                  disabled={!isEditing || !isAdmin}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="d-flex flex-row align-items-end justify-content-between">
              <p className="align-bottom m-0 mb-1 lead">Password</p>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm ml-auto mb-auto"
                disabled={!oldPassword || !newPassword || !repeatPassword}
                onClick={() => {
                  console.log('changing password');
                }}
              >
                Change Password
              </button>
            </div>
          </div>
          <hr className="m-0 mb-3" />
          <div className="row">
            <div className="col-lg-4 mb-2 mb-lg-0">
              <div className="form-group mb-lg-0">
                <label htmlFor="inputOldPassword">Old Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-2 mb-lg-0">
              <div className="form-group mb-lg-0">
                <label htmlFor="inputNewPassword">New Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputNewPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-lg-0">
              <div className="form-group mb-0">
                <label htmlFor="inputRepeatPassword">Repeat Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputRepeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
          </div>
          <p className="lead m-0 mb-1 mt-5">Questionnaire</p>
          <hr className="m-0 mb-3" />
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
          <div className="mt-5">
            <div className="d-flex flex-row align-items-end justify-content-between">
              <p className="align-bottom m-0 mb-1 lead">Consent Form</p>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary ml-auto mb-auto"
                data-toggle="modal"
                data-target="#staticBackdrop"
              >
                View form
              </button>
            </div>
          </div>
          <hr className="m-0 mb-3" />
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
          <ConsentModal
            consentScript={consentScript}
            onAccept={() =>
              userService
                .updateUserData(id, { data: { hasAcceptedConsentForm: true } })
                .then((res) => {
                  setHasAcceptedConsentForm(true);
                })
            }
          />

          <p className="lead m-0 mb-1 mt-5">Screening Status</p>
          <hr className="m-0 mb-3" />
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
        </div>
      </div>
    </div>
  );
};

const AccountPage = ({ isAdmin, consentScript }) => {
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
      <div className="px-3 px-md-5">
        {users && users.length > 0 && (
          <AccountDataPresenter user={users[0]} isAdmin={isAdmin} consentScript={consentScript} />
        )}
      </div>
    </div>
  );
};

export default AccountPage;

/*
import React, { useState } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';

// components
import DateIntervalSettings from '../DateInterval';

const QuestionnaireSettings = ({ questionnaire, save }) => {
  const [name, setName] = useState(questionnaire.name);
  const [consentScript, setConsentScript] = useState(questionnaire.consentScript);
  const [accessIntervals, setAccessIntervals] = useState(questionnaire.accessIntervals);

  return (
    <div>
      <div className="row no-gutters mt-4">
        <div className="col col-md-8 col-lg-6 col-xl-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              save({ name, consentScript, accessIntervals });
            }}
          >
            Save Settings
          </button>
          <p className="lead m-0 mt-5">Questionnaire Name</p>
          <hr className="m-0 mb-3" />
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="inputGroup-name"
          />

          <p className="lead m-0 mt-5">Access Intervals</p>
          <hr className="m-0 mb-3" />
          <div className="col d-flex p-0">
            <DateIntervalSettings intervals={accessIntervals} setIntervals={setAccessIntervals} />
          </div>
          <p className="lead m-0 mt-5">Consent Script</p>
          <hr className="m-0 mb-3" />
          <textarea
            className="form-control"
            id="consentText"
            rows="6"
            value={consentScript}
            onChange={(e) => setConsentScript(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

QuestionnaireSettings.propTypes = {
  questionnaire: shape({
    id: string,
    name: string,
    consentScript: string,
    accessIntervals: arrayOf(
      shape({
        id: string,
        start: string,
        end: string
      })
    )
  }).isRequired,
  save: func.isRequired
};

export default QuestionnaireSettings;

*/
