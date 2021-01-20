import { func } from 'prop-types';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

// services
import { userService } from '../../services';

const Submit = ({ setHideNavbar }) => {
  const history = useHistory();
  const { userId } = useParams();

  const submit = () => {
    userService.updateUserData(userId, { data: { finishedOn: Date.now(), stoppedAtIndex: -1 } });
    history.push(`/users/${userId}`);
  };

  return (
    <div>
      <div className="jumbotron jumbotron-fluid text-center mt-5">
        <div className="container">
          <h1 className="display-4">Thank you!</h1>
        </div>

        <button
          type="button"
          className="btn btn-lg btn-primary mt-3"
          onClick={() => {
            setHideNavbar(false);
            submit();
          }}
        >
          Finish FFQ
        </button>
      </div>
    </div>
  );
};

Submit.propTypes = {
  setHideNavbar: func.isRequired
};

export default Submit;
