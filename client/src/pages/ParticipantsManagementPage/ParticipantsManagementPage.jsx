/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// services
import { questionnaireService } from '../../services';

// custom hooks
import { useFetchUsers, useFetchQuestions } from '../../hooks';

// helpers
import { addValidString, dateHelper } from '../../helpers';

// components
import Spinner from '../../components/Spinner';
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
    dataField: 'screeningData',
    text: 'Screening Data'
  },
  {
    dataField: 'personalData',
    text: 'Personal Data'
  },
  {
    dataField: 'startedAt',
    text: 'Started',
    formatter: (cellContent, row) => {
      return dateHelper.applyDateStyle(cellContent);
    }
  },
  {
    dataField: 'finishedAt',
    text: 'Finished',
    formatter: (cellContent, row) => {
      return dateHelper.applyDateStyle(cellContent);
    }
  }
];

const ParticipantsManagement = ({
  users,
  questions,
  iterations,
  name,
  prevSelectionCriteria,
  prevSelectionRules
}) => {
  const [selectionCriteria, setSelectionCriteria] = useState(prevSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(prevSelectionRules);
  const [selectedIteration, setSelectedIteration] = useState();
  const [columns, setColumns] = useState(dataColumns);
  const [data, setData] = useState([]);

  useEffect(() => {
    // if iterationsArray doesnt contain the data
    // useFetchIterations to load data and add to array
  }, [selectedIteration]);

  const answerFormatter = (column, colIndex) => {
    if (column && !Array.isArray(column)) {
      return column;
    }
    if (column && Array.isArray(column)) {
      const formattedAnswer = column.map((answer) => {
        return <li key={answer}>{answer}</li>;
      });

      return <ul className="list-unstyled content-align-center mb-0">{formattedAnswer}</ul>;
    }
    return '';
  };

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
          formatter: answerFormatter,
          headerFormatter: questionHeaderFormatter
        };
      });
      const allColumns = dataColumns.concat(questionColumns);
      setColumns(allColumns);
    }
  }, [questions]);

  const extractAnswers = (answers) => {
    let formattedAnswer;
    if (answers && !Array.isArray(answers)) {
      if (answers.index) {
        formattedAnswer = answers.index;
      } else {
        formattedAnswer = answers.title;
      }
    } else if (answers && Array.isArray(answers)) {
      formattedAnswer = answers.map((answer) => {
        if (!answer.hasNumberInput) {
          return `${answer.title}: ${answer.answer}`;
        }
        return `${answer.title}: ${answer.answer} ${answer.numberAnswer} ${answer.numberInputTitle}`;
      });
    }

    return formattedAnswer;
  };

  useEffect(() => {
    if (users && users.length) {
      const questionData = users.map((user) => {
        if (!user.iterations || !user.iterations.length || !user.iterations[0].answers) {
          return user;
        }
        const userWithAnswers = { ...user };
        user.iterations[0].answers.forEach((answer) => {
          userWithAnswers[answer.questionId] = extractAnswers(answer.answerOption);
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

  const participantsContent = (
    <div>
      <ToolkitProvider
        keyField="email"
        data={data}
        columns={columns}
        bootstrap4
        exportCSV={{ fileName: `${name}_${selectedIteration}.csv` }}
      >
        {(props) => (
          <div>
            <div className="row">
              <div className="col">
                <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
              </div>
              <div className="col">
                <div className="form-group">
                  <select
                    className="form-control"
                    id="intervalSelect"
                    onChange={(e) => setSelectedIteration(e.target.value)}
                  >
                    {iterations.map((iteration) => {
                      return <option key={iteration}>{iteration}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
            <br />
            <div className="row no-gutters overflow-auto flex-row flex-nowrap">
              <div className="col">
                <BootstrapTable
                  {...props.baseProps}
                  bordered={false}
                  striped
                  hover
                  noDataIndication="No participants data"
                />
              </div>
            </div>
          </div>
        )}
      </ToolkitProvider>
    </div>
  );

  const selectionCriteriaContent = (
    <CriteriaEditor
      selectionCriteria={selectionCriteria}
      addSelectionCriteria={saveSelectionCriteria}
      removeSelectionCriteria={removeFromSelectionCriteria}
    />
  );

  const ruleEditorContent = (
    <RuleEditor
      selectionCriteria={selectionCriteria}
      rules={selectionRules}
      saveRule={saveRule}
      removeRule={removeRule}
    />
  );

  const tabNames = ['Participants', 'Selection Criteria', 'Selection Rules'];
  const tabContents = [participantsContent, selectionCriteriaContent, ruleEditorContent];

  return (
    <div>
      <div>
        <NavTabs tabNames={tabNames} />
      </div>
      <div className="mt-5">
        <NavContents tabNames={tabNames} tabContents={tabContents} />
      </div>
    </div>
  );
};

const ParticipantsManagementPage = () => {
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers();
  const [
    { fetchedQuestions, isLoadingQuestions, isErrorQuestions },
    setQuestionniareId
  ] = useFetchQuestions();

  const sampleIterations = ['601333b87e41ce7e7648ec1e', '601333b87e41ce7e7648ec1f'];
  const sampleName = 'FFQ';
  useEffect(() => {
    const fetchIds = async () => {
      // TODO fetch iterations and name and pass them along
      await questionnaireService.fetchQuestionnaires('_id').then((response) => {
        console.log(response);
        setQuestionniareId(response.data[0]);
      });
    };

    fetchIds();
  }, []);

  return (
    <div>
      <div>
        {(isErrorUsers || isErrorQuestions) && (
          <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
            Something went wrong...
          </div>
        )}
        {(isLoadingUsers || isLoadingQuestions) && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        <div className="m-4 d-flex justify-content-center">
          <div className="w-100">
            {users && users.length > 0 && fetchedQuestions && (
              <ParticipantsManagement
                users={users}
                questions={fetchedQuestions}
                name={sampleName}
                iterations={sampleIterations}
                prevSelectionCriteria={mockSelectionCriteria}
                prevSelectionRules={mockRules}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsManagementPage;
