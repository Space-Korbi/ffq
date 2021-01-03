import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

// custom hooks
import { useFetchUsers } from '../../hooks';

// helpers
import { addValidString } from '../../helpers';

// components
import { NavTabs, NavContents } from '../../components/Navigation';
import { CriteriaEditor, RuleEditor } from '../../components/UserSelection';

const rule1 = {
  id: '1',
  criteria: ['Laktose Intolerant', 'Vegan'],
  operator: 'And',
  decision: 'Accept'
};

const rule2 = {
  id: '2',
  criteria: ['Taking Medication'],
  operator: '',
  decision: 'Wait'
};

const mockSelectionCriteria = ['Laktose Intolerant', 'Taking Medication', 'Pregnant', 'Vegan'];
const mockRules = [rule1, rule2];

const ParticipantsManagementPage = () => {
  const [{ users, isLoading, isError }] = useFetchUsers();
  const [selectionCriteria, setSelectionCriteria] = useState(mockSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(mockRules);

  /**
   * TODO
   * api call to get rules && api call to get Saved criteria
   */

  const saveSelectionCriteria = (newCriteria) => {
    console.log(newCriteria);
    addValidString(newCriteria, selectionCriteria, setSelectionCriteria);
  };

  const removeFromSelectionCriteria = (criteriaToRemove) => {
    setSelectionCriteria(selectionCriteria.filter((criteria) => criteria !== criteriaToRemove));
  };

  const saveRule = (newRule) => {
    /**
     * TODO
     * api call to save rules in db
     */

    if (!selectionRules.includes(newRule)) {
      setSelectionRules((prevRules) => [...prevRules, newRule]);
    }
  };

  const removeRule = (ruleToRemove) => {
    if (ruleToRemove !== undefined) {
      setSelectionRules(
        selectionRules.filter((rule) => {
          return rule !== ruleToRemove;
        })
      );
    }
  };

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
    <BootstrapTable
      keyField="email"
      data={users}
      columns={columns}
      noDataIndication="No participants"
    />,
    <CriteriaEditor
      selectionCriteria={selectionCriteria}
      addSelectionCriteria={saveSelectionCriteria}
      removeSelectionCriteria={removeFromSelectionCriteria}
    />,
    <RuleEditor
      selectionCriteria={selectionCriteria}
      rules={selectionRules}
      saveRule={saveRule}
      removeRule={removeRule}
    />
  ];

  return (
    <div className="m-4 d-flex justify-content-center">
      <div className="w-100">
        {isError && (
          <div className="alert alert-danger d-flex justify-content-center" role="alert">
            Something went wrong
          </div>
        )}
        {isLoading ? (
          'Loading...'
        ) : (
          <div>
            <div>
              <NavTabs tabNames={tabNames} />
            </div>
            <div className="mt-5">
              <NavContents tabNames={tabNames} tabContents={tabContents} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantsManagementPage;
