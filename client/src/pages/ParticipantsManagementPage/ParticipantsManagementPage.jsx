/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

// custom hooks
import { useFetchUsers, useFetchQuestions } from '../../hooks';

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

const dataColumns = [
  {
    dataField: 'email',
    text: 'Email'
  },
  {
    dataField: 'firstName',
    text: 'First Name'
  },
  {
    dataField: 'lastName',
    text: 'Last Name'
  },
  {
    dataField: 'hasAcceptedConsentForm',
    text: 'Consent Form'
  },
  {
    dataField: 'screeningStatus',
    text: 'Screening Status'
  },
  {
    dataField: 'personalData',
    text: 'Personal Data'
  },
  {
    dataField: 'screeningData',
    text: 'Screening Data'
  },
  {
    dataField: 'startDate',
    text: 'Started'
  },
  {
    dataField: 'endDate',
    text: 'Finished'
  }
];

const ParticipantsManagementPage = () => {
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers();
  const [{ questions, isLoadingQuestions, isErrorQuestions }] = useFetchQuestions(
    'wWOHBJtGAkPYccFyna5OH'
  );
  const [selectionCriteria, setSelectionCriteria] = useState(mockSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(mockRules);
  const [columns, setColumns] = useState(dataColumns);

  const questionHeaderFormatter = (column, colIndex) => {
    console.log(column, colIndex);
    return (
      <div>
        {column.title}
        <br />
        {column.subtitle1 ? <small>{column.subtitle1}</small> : <small>-</small>}
        <br />
        {column.subtitle2 ? <small>{column.subtitle2}</small> : <small>-</small>}
      </div>
    );
  };

  useEffect(() => {
    if (questions && questions.length) {
      const questionColumns = questions.map((question, index) => {
        return {
          dataField: question._id,
          text: `Question ${index + 1}`,
          title: question.title,
          subtitle1: question.subtitle1,
          subtitle2: question.subtitle2,
          headerFormatter: questionHeaderFormatter
        };
      });
      const allColumns = dataColumns.concat(questionColumns);
      setColumns(allColumns);
    }
  }, [questions]);

  /**
   * TODO
   * api call to get rules && api call to get Saved criteria
   */

  const saveSelectionCriteria = (newCriteria) => {
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

  const tabNames = ['Participants', 'Selection Criteria', 'Selection Rules'];
  const tabContents = [
    <div className="row no-gutters overflow-auto flex-row flex-nowrap">
      <div className="col">
        <BootstrapTable
          keyField="email"
          data={users}
          columns={columns}
          bordered={false}
          striped
          hover
          noDataIndication="No participants data"
        />
      </div>
    </div>,
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
        {isErrorUsers && (
          <div className="alert alert-danger d-flex justify-content-center" role="alert">
            Something went wrong
          </div>
        )}
        {isLoadingUsers ? (
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
