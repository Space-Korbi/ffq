/* eslint-disable no-unused-vars */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

// custom hooks
import { useFetchUsers } from '../../hooks';

// components
import { NavTabs, NavContents } from '../../components/Navigation';
import UserSelection from '../../components/UserSelection';

const ParticipantsManagementPage = () => {
  const [{ users, isLoading, isError }] = useFetchUsers();
  console.log('Users', users);
  // load all userData

  const columns = [
    {
      dataField: 'email',
      text: 'User Email'
    },
    {
      dataField: 'firstName',
      text: 'First Name'
    },
    {
      dataField: 'lastName',
      text: 'Last Name'
    }
  ];

  const tabNames = ['Participants', 'Selection Criteria', 'Selection Rules'];
  const tabContents = [
    <BootstrapTable keyField="email" data={users} columns={columns} />,
    <UserSelection />,
    <div>Rules</div>
  ];

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
