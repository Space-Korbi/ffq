import React from 'react';

// components
import { NavTabs, NavContents } from '../../components/Navigation';
import UserSelection from '../../components/UserSelection';

const ParticipantsManagementPage = () => {
  // load all userData

  // display user data in table

  const participantsTable = <div>Welcome to ParticipantsManagementPage</div>;

  const tabNames = ['Participants', 'Selection Criteria', 'Selection Rules'];
  const tabContents = [participantsTable, <UserSelection />, <div>Rules</div>];

  return (
    <div className="m-3">
      <div>
        <NavTabs tabNames={tabNames} />
      </div>
      <div>
        <NavContents tabNames={tabNames} tabContents={tabContents} />
      </div>
    </div>
  );
};

export default ParticipantsManagementPage;
