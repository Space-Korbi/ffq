import React from 'react';
import { bool, shape } from 'prop-types';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

const HomePage = ({ isAdmin, user }) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      {user && (
        <>
          {isAdmin ? <AdminPage /> : <ParticipantPage stoppedAtIndex={user.user.stoppedAtIndex} />}
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  isAdmin: bool.isRequired,
  user: shape({}).isRequired
};

export default HomePage;
