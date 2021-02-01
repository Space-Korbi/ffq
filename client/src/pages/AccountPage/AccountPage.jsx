/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

// custom hooks
import { useFetchUsers, useFetchQuestionnairesInfo, useUpdateUser } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import ConsentModal from '../../components/Modals';

const AccountDataPresenter = ({ user, isAdmin, questionnaireInfo }) => {
  const history = useHistory();
  const [{ update, isUpdatingUser, errorUpdatingUser }, setUpdate] = useUpdateUser(user.id);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);

  const { id, screeningStatus } = user;
  const { consentScript, iterations } = questionnaireInfo;

  useEffect(() => {
    if (update.hasAcceptedConsentForm) {
      setHasAcceptedConsentForm(true);
    }
  }, [update]);

  const handleEdit = () => {
    if (isEditing) {
      setUpdate({ firstName, lastName, email });
    }
    setIsEditing((prevState) => !prevState);
  };

  const handleChangePassword = () => {
    if (isChangingPassword) {
      // userService.updateUserData({ passwords });
    }
    setIsChangingPassword((prevState) => !prevState);
  };

  const startQuestionnaire = (userId) => {
    history.push(`/users/${userId}`);
  };

  const getCompletedIterations = () => {
    const completedIterations = user.iterations.filter((iteration) => {
      return moment(iteration.finishedAt) < moment().toDate();
    });
    return completedIterations;
  };

  const isIncompleteIteration = (currentIteration) => {
    return user.iterations.some((iteration) => {
      if (
        iteration.iterationId === currentIteration.id &&
        iteration.startedAt &&
        !iteration.finishedAt
      ) {
        return true;
      }
      return false;
    });
  };

  // const completedIterations = getCompletedIterations();
  const getIterationStatus = (completedIterations, iteration) => {
    const now = moment().toDate();

    if (completedIterations && completedIterations.length) {
      if (
        completedIterations.some(
          (completedIteration) => iteration.id === completedIteration.iterationId
        )
      ) {
        return <span className="badge badge-success mx-1">Completed</span>;
      }
    }
    if (isIncompleteIteration(iteration)) {
      return (
        <div>
          <span className="badge badge-warning mx-1">Not completed</span>
          {moment(now).isBetween(iteration.start, iteration.end, 'day', '[]') && (
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => history.push(`questionnairePresenter/${iteration.id}`)}
            >
              Continue now
            </button>
          )}
        </div>
      );
    }
    return (
      <div>
        <span className="badge badge-danger mx-1">Not started</span>
        {moment(now).isBetween(iteration.start, iteration.end, 'day', '[]') && (
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={() => startQuestionnaire(user.id)}
          >
            Start now
          </button>
        )}
      </div>
    );
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
                  onChange={(e) => setEmail(e.target.value)}
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
          <p className="lead m-0 mb-1 mt-5">Questionnaire Iterations</p>
          <hr className="m-0 mb-3" />
          <div className="table m-0">
            <table className="table  m-0 border-top-0">
              <caption className="p-0 pt-2 ml-1">
                The questionnaire can be accessed in between each interval, start and end date
                included.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="pt-0">
                    Start
                  </th>
                  <th scope="col" className="pt-0">
                    End
                  </th>
                  <th scope="col" className="pt-0">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {iterations.length ? (
                  iterations.map((interval) => {
                    const completedIterations = getCompletedIterations();
                    return (
                      <tr key={interval.id}>
                        <td className="align-middle">
                          {moment(interval.start).format('DD.MM.YY')}
                        </td>
                        <td className="align-middle">{moment(interval.end).format('DD.MM.YY')}</td>
                        <td className="align-middle">
                          {getIterationStatus(completedIterations, interval)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3">
                      <div className="d-flex flex-column text-center">
                        <span className="badge badge-warning">No Iterations</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
            onAccept={() => {
              setUpdate({ hasAcceptedConsentForm: false });
            }}
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
            questionnaireInfo={questionnairesInfo[0]}
          />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
