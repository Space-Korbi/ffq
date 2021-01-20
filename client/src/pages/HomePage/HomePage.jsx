import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetchUsers } from '../../hooks';

// subpages
import AdminPage from './AdminPage';
import ParticipantPage from './ParticipantPage';

// components
import Spinner from '../../components/Spinner';

const HomePage = ({ questionnaireMetaData, isAdmin }) => {
  const { userId } = useParams();
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(userId);

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
      {users && users.length > 0 && questionnaireMetaData && (
        <>
          {isAdmin ? (
            <AdminPage />
          ) : (
            <ParticipantPage user={users[0]} questionnaireData={questionnaireMetaData} />
          )}
        </>
      )}
    </div>
  );
};

HomePage.propTypes = {
  isAdmin: bool.isRequired,
  questionnaireMetaData: shape({
    id: string,
    name: string,
    accessIntervals: arrayOf(shape({ id: string, start: string, end: string }))
  }).isRequired
};

export default HomePage;
