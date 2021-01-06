import React from 'react';
import { bool, number } from 'prop-types';

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
  stoppedAtIndex: number
};

HomePage.defaultProps = {
  stoppedAtIndex: -1
};

export default HomePage;
