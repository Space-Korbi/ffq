/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// custom hooks
import { useFetchUsers, useFetchQuestions, useFetchQuestionnaires } from '../../hooks';

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

const fetchUserAnswers = (users, selectedIteration) => {
  return users.map((user) => {
    const index = user.iterations.findIndex((iteration) => {
      return iteration.id === selectedIteration.id;
    });

    if (!user.iterations || !user.iterations.length || !user.iterations[0].answers || index < 0) {
      return user;
    }
    const userWithAnswers = { ...user };

    user.iterations[index].answers.forEach((answer) => {
      userWithAnswers[answer.questionId] = extractAnswers(answer.answerOption);
    });
    return userWithAnswers;
  });
};

const ParticipantsManagement = ({
  questions,
  iterations,
  name,
  prevSelectionCriteria,
  prevSelectionRules
}) => {
  const [{ users, isLoadingUsers, isErrorUsers }] = useFetchUsers(null, iterations[0].id);

  console.log(iterations);
  console.log('users', users);
  const [selectionCriteria, setSelectionCriteria] = useState(prevSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(prevSelectionRules);
  const [selectedIteration, setSelectedIteration] = useState({
    startLabel: 'undefined',
    endLabel: 'undefined'
  });
  const [columns, setColumns] = useState(dataColumns);
  const [data, setData] = useState([]);
  const iterationsAnswers = new Set();

  // set initially selected iteration
  useEffect(() => {
    if (iterations.length) {
      setSelectedIteration(iterations[0]);
    }
  }, [iterations]);

  useEffect(() => {
    if (!selectedIteration || !selectedIteration.id || !users || !users.length) {
      return;
    }
    const questionData = fetchUserAnswers(users, selectedIteration);
    iterationsAnswers.add(questionData);
    console.log('----------', iterationsAnswers);

    // if iterationsArray doesnt contain the data
    // useFetchIterations to load data and add to array
    setData(questionData);
  }, [selectedIteration, users]);

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
        exportCSV={{
          fileName: `${name} ${selectedIteration.startLabel}-${selectedIteration.endLabel}.csv`
        }}
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
                    className="form-control custom-select"
                    id="intervalSelect"
                    onChange={(e) => {
                      setSelectedIteration(iterations[e.target.value]);
                    }}
                  >
                    {iterations.map((iteration, index) => {
                      return (
                        <option key={iteration.id} value={index}>
                          {`${iteration.startLabel} - ${iteration.endLabel}`}
                        </option>
                      );
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
  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires(null, '_id name iterations');
  const [
    { fetchedQuestions, isLoadingQuestions, isErrorQuestions },
    setQuestionniareId
  ] = useFetchQuestions();

  useEffect(() => {
    if (fetchedQuestionnaires && fetchedQuestionnaires.length) {
      setQuestionniareId(fetchedQuestionnaires[0]._id);
    }
  }, [fetchedQuestionnaires]);

  return (
    <div>
      <div>
        {(isErrorQuestionnaires || isErrorQuestions) && (
          <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
            Something went wrong...
          </div>
        )}
        {(isLoadingQuestionnaires || isLoadingQuestions) && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        <div className="m-4 d-flex justify-content-center">
          <div className="w-100">
            {fetchedQuestionnaires && fetchedQuestionnaires.length > 0 && fetchedQuestions && (
              <ParticipantsManagement
                questions={fetchedQuestions}
                name={fetchedQuestionnaires[0].name}
                iterations={fetchedQuestionnaires[0].iterations}
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
