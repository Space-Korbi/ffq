/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

// services
import { userService } from '../../services';

const Submit = ({ iterationId }) => {
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
          <h1 className="lead">Thank you for participating!</h1>
        </div>

        <button
          type="button"
          className="btn btn-lg btn-primary mt-3"
          onClick={() => {
            submit();
          }}
        >
          Finish FFQ
        </button>
      </div>
    </div>
  );
};

export default Submit;
