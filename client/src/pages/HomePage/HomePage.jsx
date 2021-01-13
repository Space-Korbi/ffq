import React from 'react';
import { bool } from 'prop-types';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchUsers } from '../../hooks';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

// components
import Spinner from '../../components/Spinner';

const HomePage = ({ isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  // Todo: onlu load user metadata or data thats needed
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
      {users && users.length > 0 && (
        <>{isAdmin ? <AdminPage /> : <ParticipantPage user={users[0]} />}</>
      )}
    </div>
  );
};

HomePage.propTypes = {
  isAdmin: bool.isRequired
};

export default HomePage;
