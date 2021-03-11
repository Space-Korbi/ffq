/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

// services
import { userService } from '../../services';

const Submit = ({ iterationId }) => {
  const { t } = useTranslation(['globals']);

  const history = useHistory();
  const { userId } = useParams();

  const submit = async () => {
    await userService
      .updateUserIteration(userId, iterationId, { finishedAt: moment().toDate() })
      .then(history.push(`/users/${userId}`));
  };

  return (
    <div>
      <div className="jumbotron jumbotron-fluid text-center mt-5">
        <div className="container">
          <h1 className="lead">
            {t(('globals:thank_for_participation', 'Vielen Dank für Ihre Teilnahme!'))}
          </h1>
        </div>

        <button
          type="button"
          className="btn btn-lg btn-primary mt-3"
          onClick={() => {
            submit();
          }}
        >
          {t(('globals:finish_ffq', 'Fragebogen beenden'))}
        </button>
      </div>
    </div>
  );
};

export default Submit;
