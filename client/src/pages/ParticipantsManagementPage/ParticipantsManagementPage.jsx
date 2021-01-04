/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

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
    text: 'Consent Form',
    formatter: (cellContent, row) => {
      if (cellContent) {
        return <span className="badge badge-success">Accepted</span>;
      }
      return <span className="badge badge-danger">Not yet accepted</span>;
    }
  },
  {
    dataField: 'screeningStatus',
    text: 'Screening Status',
    formatter: (cellContent, row) => {
      if (cellContent === 'accept') {
        return <span className="badge badge-success">Accepted</span>;
      }
      if (cellContent === 'reject') {
        return <span className="badge badge-danger">Rejected</span>;
      }
      if (cellContent === 'wait') {
        return <span className="badge badge-warning">Waiting</span>;
      }
      return cellContent;
    }
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
  const [data, setData] = useState([]);

  const questionHeaderFormatter = (column, colIndex) => {
    return (
      <div>
        {column.questionTitle}
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
          questionTitle: question.title,
          subtitle1: question.subtitle1,
          subtitle2: question.subtitle2,
          csvText: question.title,
          headerFormatter: questionHeaderFormatter
        };
      });
      const allColumns = dataColumns.concat(questionColumns);
      setColumns(allColumns);
    }
  }, [questions]);

  useEffect(() => {
    if (users && users.length) {
      const questionData = users.map((user) => {
        if (!user.answers || !user.answers.length) {
          return user;
        }
        const userWithAnswers = { ...user };
        user.answers.forEach((answer) => {
          userWithAnswers[answer.questionId] = answer.answerOptionId;
        });
        return userWithAnswers;
      });
      setData(questionData);
    }
  }, [users]);

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

  const ExportCSVButton = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button type="button" className="btn btn-outline-success" onClick={handleClick}>
          Export to CSV
        </button>
      </div>
    );
  };

  const tabNames = ['Participants', 'Selection Criteria', 'Selection Rules'];
  const tabContents = [
    <div className="row no-gutters overflow-auto flex-row flex-nowrap">
      <div className="col">
        <ToolkitProvider
          keyField="email"
          data={data}
          columns={columns}
          bordered={false}
          striped
          hover
          noDataIndication="No participants data"
          exportCSV
        >
          {(props) => (
            <div>
              <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
              <hr />
              <BootstrapTable {...props.baseProps} />
            </div>
          )}
        </ToolkitProvider>
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
