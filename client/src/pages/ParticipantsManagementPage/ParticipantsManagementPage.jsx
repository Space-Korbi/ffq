/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

// services
import { userService } from '../../services';

// custom hooks
import { useFetchQuestions, useFetchQuestionnaires } from '../../hooks';

// helpers
import { addValidString } from '../../helpers';

// components
import Spinner from '../../components/Spinner';
import { NavTabs, NavContents } from '../../components/Navigation';
import ParticipantsTable from './ParticipantsTable';
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

const formatAnswer = (answers) => {
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

const parseAnswers = (users, selectedIteration) => {
  return users.map((user) => {
    const index = user.iterations.findIndex((iteration) => {
      return iteration.id === selectedIteration.id;
    });

    if (!user.iterations || !user.iterations.length || !user.iterations[0].answers || index < 0) {
      return user;
    }
    const userWithAnswers = { ...user };

    user.iterations[index].answers.forEach((answer) => {
      userWithAnswers[answer.questionId] = formatAnswer(answer.answerOption);
    });
    return userWithAnswers;
  });
};

const listAnswers = (column) => {
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

const ParticipantsManagement = ({
  questions,
  iterations,
  name,
  prevSelectionCriteria,
  prevSelectionRules
}) => {
  const [selectionCriteria, setSelectionCriteria] = useState(prevSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(prevSelectionRules);
  const [selection, setSelection] = useState(0);
  const [selectedIteration, setSelectedIteration] = useState({
    startLabel: 'undefined',
    endLabel: 'undefined'
  });
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (iterations.length) {
      setSelectedIteration(iterations[selection]);
    }
  }, [selection]);

  const questionHeaderFormatter = (column) => {
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
          formatter: listAnswers,
          headerFormatter: questionHeaderFormatter
        };
      });
      setColumns(questionColumns);
    }
  }, [questions]);

  const onSetResult = (result) => {
    const iterationData = parseAnswers(result, selectedIteration);
    localStorage.setItem(selectedIteration.id, JSON.stringify(iterationData));
    setData(iterationData);
  };

  useEffect(() => {
    let didCancel = false;

    if (!selectedIteration || !selectedIteration.id) {
      return () => {
        didCancel = true;
      };
    }

    const cachedHits = localStorage.getItem(selectedIteration.id);

    if (cachedHits) {
      setData(JSON.parse(cachedHits));
    } else {
      const fetchUsers = async () => {
        try {
          await userService.fetchUsers(null, selectedIteration.id, null).then((users) => {
            if (!didCancel) {
              const iterationData = parseAnswers(users, selectedIteration);
              onSetResult(iterationData);
            }
          });
        } catch (error) {
          if (!didCancel) {
            // display info that data could not be fetched
            console.log(error);
          }
        }
      };
      fetchUsers();
    }
    return () => {
      didCancel = true;
    };
  }, [selectedIteration]);

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

  const IterationSelector = () => {
    return (
      <div className="form-group form-inline m-0">
        <select
          className="form-control custom-select"
          id="iterationSelect"
          value={selection}
          onChange={(e) => {
            setSelection(e.target.value);
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
    );
  };

  const participantsContent = (
    <ParticipantsTable
      fileName={`${name} ${selectedIteration.startLabel}-${selectedIteration.endLabel}.csv`}
      data={data}
      columns={columns}
      iterationSelector={<IterationSelector />}
    />
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
      <div className="mt-4">
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
