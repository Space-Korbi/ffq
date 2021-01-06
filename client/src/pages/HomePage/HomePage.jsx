import { bool, number } from 'prop-types';
import React from 'react';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

const HomePage = ({ isAdmin, stoppedAtIndex }) => {
  return (
    <div className="d-flex justify-content-center mt-5">
      {isAdmin ? <AdminPage /> : <ParticipantPage stoppedAtIndex={stoppedAtIndex} />}
    </div>
  );
};

HomePage.propTypes = {
  isAdmin: bool.isRequired,
  stoppedAtIndex: number.isRequired
};

export default HomePage;
