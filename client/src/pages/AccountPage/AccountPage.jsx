/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// services
import { userService } from '../../services';

// helpers
import { dateHelper } from '../../helpers';

// custom hooks
import { useFetchUsers, useFetchQuestionnairesInfo } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import ConsentModal from '../../components/Modals';

const AccountDataPresenter = ({ user, isAdmin, consentScript }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);

  const { id, email, startedAt, finishedAt, stoppedAtIndex, screeningStatus } = user;

  const handleEdit = () => {
    if (isEditing) {
      // userService.updateUserData({ firstName, lastName });
    }
    setIsEditing((prevState) => !prevState);
  };

  const handleChangePassword = () => {
    if (isChangingPassword) {
      // userService.updateUserData({ passwords });
    }
    setIsChangingPassword((prevState) => !prevState);
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
                onClick={() => {
                  handleChangePassword();
                }}
              >
                {isChangingPassword ? 'Save Password' : 'Change Password'}
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
                  disabled={!isChangingPassword}
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
                  disabled={!isChangingPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
            <div className="col-lg-4 mb-lg-0">
              <div className="form-group mb-0">
                <label htmlFor="inputConfirmPassword">Repeat Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputConfirmPassword"
                  value={confirmPassword}
                  disabled={!isChangingPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  aria-describedby="inputGroup-name"
                />
              </div>
            </div>
          </div>
          <p className="lead m-0 mb-1 mt-5">Questionnaire</p>
          <hr className="m-0 mb-3" />
          <p>
            <strong>FFQ started:</strong>
            {dateHelper.applyDateStyle(startedAt)}
          </p>
          <p>
            <strong>FFQ finished:</strong>
            {finishedAt ? (
              <span className="badge badge-success mx-1">{dateHelper.toDateDE(finishedAt)}</span>
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
              {consentScript && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary ml-auto mb-auto"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                >
                  View Form
                </button>
              )}
            </div>
          </div>
          <hr className="m-0 mb-3" />
          {hasAcceptedConsentForm ? (
            <span className="badge badge-success mx-1">Accepted</span>
          ) : (
            <span className="badge badge-danger mx-1">Not accepted</span>
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
  const [{ questionnairesInfo, isLoadingInfo, isErrorInfo }] = useFetchQuestionnairesInfo();
  console.log('questionnairesInfo', questionnairesInfo);

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
        {users && users.length > 0 && questionnairesInfo && questionnairesInfo.length > 0 && (
          <AccountDataPresenter
            user={users[0]}
            isAdmin={isAdmin}
            consentScript={questionnairesInfo[0].consentScript}
          />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
