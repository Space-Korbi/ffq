/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

// custom hooks
import { useFetchUsers, useFetchQuestionnaires, useUpdateUser } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import EditPersonalInfo from './EditPersonalInfo';
import ChangePassword from './ChangePassword';
import { ConsentModal } from '../../components/Modals';

const AccountDataPresenter = ({ user, isAdmin, questionnaireInfo }) => {
  const { t } = useTranslation(['accountPage', 'globals']);

  const history = useHistory();
  const [{ update, isUpdatingUser, errorUpdatingUser }, setUpdate] = useUpdateUser(user.id);

  const [hasAcceptedConsentForm, setHasAcceptedConsentForm] = useState(user.hasAcceptedConsentForm);

  const { firstName, lastName, email, screeningStatus } = user;
  const { consentScript, iterations } = questionnaireInfo;

  useEffect(() => {
    if (update.hasAcceptedConsentForm) {
      setHasAcceptedConsentForm(true);
    }
  }, [update]);

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
      if (iteration.id === currentIteration.id && iteration.startedAt && !iteration.finishedAt) {
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
        completedIterations.some((completedIteration) => iteration.id === completedIteration.id)
      ) {
        return (
          <span className="badge badge-success mx-1">
            {t('iteration_completed', 'Abgeschlossen')}
          </span>
        );
      }
    }
    if (isIncompleteIteration(iteration)) {
      return (
        <div>
          <span className="badge badge-warning mx-1">
            {t('iteration_not_completed', 'Nicht abgeschlossen')}
          </span>
          {moment(now).isBetween(iteration.start, iteration.end, 'day', '[]') && (
            <button
              type="button"
              className="btn btn-sm btn-link"
              onClick={() => history.push(`questionnairePresenter/iteration/${iteration.id}`)}
            >
              {t('iteration_continue', 'Fortsetzen')}
            </button>
          )}
        </div>
      );
    }
    return (
      <div>
        <span className="badge badge-danger mx-1">
          {t('iteration_not_started', 'Nicht gestartet')}
        </span>
        {moment(now).isBetween(iteration.start, iteration.end, 'day', '[]') && (
          <button
            type="button"
            className="btn btn-sm btn-link"
            onClick={() => startQuestionnaire(user.id)}
          >
            {t('iteration_not_started', 'Jetzt starten')}
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1000px' }}>
      <div className="row no-gutters">
        <div className="col">
          <EditPersonalInfo
            userId={user.id}
            isAdmin={isAdmin}
            personalInfo={{ firstName, lastName, email }}
          />
          <ChangePassword userId={user.id} />
          {!isAdmin && (
            <div>
              <p className="lead m-0 mb-1 mt-5">{t('iteration_headline', 'Wiederholungen')}</p>
              <hr className="m-0 mb-3" />
              <div className="row no-gutters overflow-auto flex-row flex-nowrap">
                <div className="col">
                  <div className="table m-0">
                    <table className="table  m-0 border-top-0">
                      <caption className="p-0 pt-2 ">
                        {t(
                          'iteration_caption',
                          'Der Fragebogen kann nur zwischen Startdatum und Enddatum jeder Wiederholung ausgefüllt werden.'
                        )}
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col" className="pt-0 pl-0">
                            {t('iteration_table_start', 'Start')}
                          </th>
                          <th scope="col" className="pt-0 pl-0">
                            {t('iteration_table_end', 'Ende')}
                          </th>
                          <th scope="col" className="pt-0 pl-0">
                            {t('iteration_table_status', 'Status')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {iterations.length ? (
                          iterations.map((iteration) => {
                            const completedIterations = getCompletedIterations();
                            // TODO: change startLabel cause it is not localizable
                            return (
                              <tr key={iteration.id}>
                                <td className="align-middle pl-0">{iteration.startLabel}</td>
                                <td className="align-middle pl-0">{iteration.endLabel}</td>
                                <td className="align-middle pl-0">
                                  {getIterationStatus(completedIterations, iteration)}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="3">
                              <div className="d-flex flex-column text-center">
                                <span className="badge badge-warning">
                                  {t('iteration_table_empty', 'Keine Wiederholungen')}
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="d-flex flex-row align-items-end justify-content-between">
                  <p className="align-bottom m-0 mb-1 lead">
                    {t('consent_form_headline', 'Einverständniserklärung')}
                  </p>
                  {consentScript && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary ml-auto mb-1"
                      data-toggle="modal"
                      data-target="#staticBackdrop"
                    >
                      {t('view_consent_modal_button', 'Ansehen')}
                    </button>
                  )}
                </div>
              </div>
              <hr className="m-0 mb-3" />
              {hasAcceptedConsentForm ? (
                <span className="badge badge-success mx-1">
                  {t('globals:consent_accept', 'Akzeptiert')}
                </span>
              ) : (
                <span className="badge badge-danger mx-1">
                  {t('globals:consent_not_accept', 'Nicht akzeptiert')}
                </span>
              )}
              <ConsentModal
                consentScript={consentScript}
                onAccept={() => {
                  setUpdate({ hasAcceptedConsentForm: true });
                }}
              />
              <p className="lead m-0 mb-1 mt-5"> {t('screening_headline', 'Teilnahmestatus')}</p>
              <hr className="m-0 mb-3" />
              {(() => {
                switch (screeningStatus) {
                  case 'Accept':
                    return (
                      <span className="badge badge-success mx-1">
                        {t('globals:accepted', 'Akzeptiert')}
                      </span>
                    );
                  case 'Reject':
                    return (
                      <span className="badge badge-danger mx-1">
                        {t('globals:rejected', 'Abgelehnt')}
                      </span>
                    );
                  default:
                    return (
                      <span className="badge badge-warning mx-1">
                        {t('globals:wait', 'Warten')}
                      </span>
                    );
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AccountPage = ({ isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }, setFields] = useFetchUsers(
    userId,
    null,
    'firstName lastName email hasAcceptedConsentForm screeningStatus iterations.startedAt iterations.finishedAt iterations.id'
  );
  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires(null, 'consentScript iterations');

  return (
    <div>
      {(isErrorUsers || isErrorQuestionnaires) && (
        <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
          Something went wrong...
        </div>
      )}
      {(isLoadingUsers || isLoadingQuestionnaires) && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner />
        </div>
      )}
      <div className="px-3 px-md-5">
        {users && users.length > 0 && fetchedQuestionnaires && fetchedQuestionnaires.length > 0 && (
          <AccountDataPresenter
            user={users[0]}
            isAdmin={isAdmin}
            questionnaireInfo={fetchedQuestionnaires[0]}
          />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
