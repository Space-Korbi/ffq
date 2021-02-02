/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { useParams } from 'react-router-dom';
import { authService } from '../../services';

// custom hooks
import { useFetchUsers, useFetchQuestionnairesInfo } from '../../hooks';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

// components
import Spinner from '../../components/Spinner';

const HomePage = ({ isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

  return (
    <div>
      {isErrorUsers && authService.logoutUser()}
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
