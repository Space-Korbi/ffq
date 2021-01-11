import React from 'react';
import { bool } from 'prop-types';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchUsers } from '../../hooks';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

const HomePage = ({ isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  return (
    <div className="d-flex justify-content-center mt-5">
      {isErrorUsers && (
        <div className="alert alert-danger d-flex justify-content-center" role="alert">
          Something went wrong...
        </div>
      )}
      {isLoadingUsers ? (
        'Loading...'
      ) : (
        <>
          {users && users.length ? (
            <>{isAdmin ? <AdminPage /> : <ParticipantPage user={users[0]} />}</>
          ) : (
            'Loading...'
          )}
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  isAdmin: bool.isRequired
};

export default HomePage;
