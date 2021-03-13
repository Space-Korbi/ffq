/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

// localization
import { useTranslation } from 'react-i18next';

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

const ParticipantsManagement = ({ questions, questionnaire }) => {
  const { t } = useTranslation(['globals']);

  const [selectionCriteria, setSelectionCriteria] = useState(questionnaire.selectionCriteria);
  const [screeningRules, setScreeningRules] = useState(questionnaire.screeningRules);
  const [selection, setSelection] = useState(0);
  const [selectedIteration, setSelectedIteration] = useState({
    startLabel: 'undefined',
    endLabel: 'undefined'
  });
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (questionnaire.iterations.length) {
      setSelectedIteration(questionnaire.iterations[selection]);
    }
  }, [selection]);

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
            // TODO: Refactor, filter in db before sending
            console.log(users);
            users.shift();
            console.log(users);
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

    if (!screeningRules.includes(newRule)) {
      setScreeningRules((prevRules) => [...prevRules, newRule]);
    }
  };

  const removeRule = (ruleToRemove) => {
    if (ruleToRemove !== undefined) {
      setScreeningRules(
        screeningRules.filter((rule) => {
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
          {questionnaire.iterations.map((iteration, index) => {
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
      fileName={`${questionnaire.name} ${selectedIteration.startLabel}-${selectedIteration.endLabel}.csv`}
      data={data}
      columns={columns}
      iterationSelector={<IterationSelector />}
    />
  );

  const selectionCriteriaContent = (
    <CriteriaEditor
      questionnaireId={questionnaire._id}
      selectionCriteria={selectionCriteria}
      addSelectionCriteria={saveSelectionCriteria}
      removeSelectionCriteria={removeFromSelectionCriteria}
    />
  );

  const ruleEditorContent = (
    <RuleEditor
      questionnaireId={questionnaire._id}
      selectionCriteria={selectionCriteria}
      screeningRules={screeningRules}
      saveRule={saveRule}
      removeRule={removeRule}
    />
  );

  const tabNames = [
    t('globals:participants', 'Teilnehmer'),
    t('globals:selection_criteria', 'Auswahlkriterien'),
    t('globals:selection_rules', 'Auswahlregeln')
  ];
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
  const { t } = useTranslation(['globals']);

  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires(null, '_id name iterations selectionCriteria screeningRules');
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
            {t(
              ('globals:error',
              'Etwas ist schiefgelaufen. Laden Sie die Seite erneut oder versuchen Sie es später noch einmal.')
            )}
          </div>
        )}
        {(isLoadingQuestionnaires || isLoadingQuestions) && (
          <div className="d-flex justify-content-center mt-5">
            <Spinner />
          </div>
        )}
        <div className="m-2 m-sm-4 d-flex justify-content-center">
          <div className="w-100">
            {fetchedQuestionnaires && fetchedQuestionnaires.length > 0 && fetchedQuestions && (
              <ParticipantsManagement
                questions={fetchedQuestions}
                questionnaire={fetchedQuestionnaires[0]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsManagementPage;
