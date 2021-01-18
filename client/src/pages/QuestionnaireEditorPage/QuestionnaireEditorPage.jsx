/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

// services
import { questionnaireService } from '../../services';

// custom hooks
import { useFetchQuestionnaires, useFetchQuestions } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import { NavTabs, NavContents } from '../../components/Navigation';
import QuestionEditor from '../../components/QuestionEditor';
import {
  AddButton,
  DeleteButton,
  EditButton,
  MoveButton,
  OutlineButton
} from '../../components/Button';
import QuestionnaireSettings from '../../components/Settings';

const QuestionnaireEditor = ({ questionnaire, deleteQuestionnaire }) => {
  const [{ fetchedQuestions, isLoadingQuestions, isErrorQuestions }] = useFetchQuestions(
    questionnaire._id
  );

  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();

  const [startDate, setStartDate] = useState(new Date(questionnaire.startDate));
  const [endDate, setEndDate] = useState(new Date(questionnaire.endDate));

  const questionsRef = useRef(questions);

  useEffect(() => {
    if (fetchedQuestions) {
      setQuestions(fetchedQuestions);
    }
  }, [fetchedQuestions]);

  useEffect(() => {
    if (selectedQuestion) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [selectedQuestion]);

  const prepareRows = (questionData) => {
    const rows = questionData.map((question, index) => {
      return {
        question,
        index
      };
    });
    return rows;
  };

  useEffect(() => {
    if (questions) {
      questionsRef.current = questions;
      if (isEditing) {
        return;
      }
      const rowData = prepareRows(questions);
      setData(rowData);
    }
  }, [questions, isEditing]);

  const handleCreateQuestionAt = async (index) => {
    await questionnaireService.createQuestionAt(questionnaire._id, index).then((response) => {
      const questionsCopy = [...questionsRef.current];
      if (index >= 0) {
        questionsCopy.splice(index, 0, response.question);
      } else {
        questionsCopy.push(response.question);
      }
      setQuestions(questionsCopy);
    });
  };

  const handleMoveQuestionFromTo = async (question, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < questionsRef.current.length) {
      await questionnaireService
        .moveQuestionFromTo(questionnaire._id, question, fromIndex, toIndex)
        .then((response) => {
          if (response.success) {
            const questionsCopy = [...questionsRef.current];
            if (toIndex > fromIndex) {
              questionsCopy.splice(fromIndex, 1);
              questionsCopy.splice(toIndex, 0, question);
            } else if (toIndex < fromIndex) {
              questionsCopy.splice(toIndex, 0, question);
              questionsCopy.splice(fromIndex + 1, 1);
            }
            setQuestions(questionsCopy);
          }
        });
    }
  };

  const handleRemoveQuestion = async (question, index) => {
    await questionnaireService
      .removeQuestionById(questionnaire._id, question._id)
      .then((response) => {
        if (response.success) {
          const questionsCopy = [...questionsRef.current];
          if (index > -1) {
            questionsCopy.splice(index, 1);
          }
          setQuestions(questionsCopy);
        }
      });
  };

  const saveSettings = async (settings) => {
    await questionnaireService
      .updateQuestionnaireSettings(questionnaire._id, settings)
      .then((response) => {
        console.log(response);
      });
  };

  const deleteButton = (cell, row) => {
    return (
      <div className="d-flex justify-content-center">
        <DeleteButton isTrashCan onClick={() => handleRemoveQuestion(row.question, row.index)} />
      </div>
    );
  };

  const moveButtons = (cell, row) => {
    const { index } = row;
    return (
      <div className="d-flex">
        <MoveButton up onClick={() => handleMoveQuestionFromTo(row.question, index, index - 1)} />

        <MoveButton onClick={() => handleMoveQuestionFromTo(row.question, index, index + 1)} />
      </div>
    );
  };

  const editButton = (cell, row) => {
    return (
      <div>
        <EditButton
          onClick={() => setSelectedQuestion({ question: row.question, index: row.index })}
        />
      </div>
    );
  };

  const addButton = (column, colIndex) => {
    return (
      <button
        type="button"
        className="btn btn-sm btn-primary"
        onClick={() => {
          handleCreateQuestionAt();
        }}
      >
        Add Question
      </button>
    );
  };

  const columns = [
    {
      text: '',
      dataField: 'index',
      align: 'center',
      style: { width: '8px' }
    },
    {
      dataField: 'edit',
      text: 'Edit',
      editable: false,
      align: 'center',
      formatter: editButton,
      style: { width: '45px' }
    },
    {
      dataField: 'move',
      text: 'Move',
      editable: false,
      align: 'center',
      style: { width: '12px' },
      formatter: moveButtons
    },
    {
      text: 'Title',
      dataField: 'question.title'
    },
    {
      text: 'Subtitle1',
      dataField: 'question.subtitle1'
    },
    {
      text: 'Subtitle2',
      dataField: 'question.subtitle2'
    },
    {
      text: 'Help',
      dataField: 'question.help'
    },

    {
      dataField: 'delete',
      text: '',
      editable: false,
      align: 'center',
      style: { width: '12px' },
      headerFormatter: addButton,
      formatter: deleteButton
    }
  ];

  const modalTableColumns = [
    {
      text: '',
      dataField: 'index',
      align: 'center',
      style: { width: '8px' }
    },
    {
      text: 'Title',
      dataField: 'question.title'
    },
    {
      text: 'Subtitle1',
      dataField: 'question.subtitle1'
    },
    {
      text: 'Subtitle2',
      dataField: 'question.subtitle2'
    }
  ];

  const updateQuestions = (editedQuestion) => {
    const questionsCopy = questionsRef.current;
    questionsCopy.splice(selectedQuestion.index, 1, editedQuestion);
    setQuestions(questionsCopy);
    setIsEditing(false);
  };

  const questionsContent = (
    <div>
      {isEditing ? (
        <QuestionEditor
          question={selectedQuestion.question}
          onExit={updateQuestions}
          modalTable={{ data, modalTableColumns, index: selectedQuestion.index }}
        />
      ) : (
        <div>
          <div>
            {isErrorQuestions && (
              <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
                Something went wrong...
              </div>
            )}
            {isLoadingQuestions ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner />
              </div>
            ) : (
              <div className="row no-gutters overflow-auto flex-row flex-nowrap my-3">
                <BootstrapTable
                  keyField="index"
                  data={data}
                  columns={columns}
                  bordered={false}
                  hover
                  noDataIndication="No Data"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const settingsContent = (
    <QuestionnaireSettings questionnaire={questionnaire} save={saveSettings} />
  );

  const tabNames = ['Questions', 'Settings'];
  const tabContents = [questionsContent, settingsContent];

  return (
    <div>
      <div>
        <NavTabs tabNames={tabNames} />
      </div>
      <div>
        <NavContents tabNames={tabNames} tabContents={tabContents} />
      </div>
    </div>
  );
};

const QuestionnaireEditorPage = () => {
  const [
    { fetchedQuestionnaires, isLoadingQuestionnaires, isErrorQuestionnaires }
  ] = useFetchQuestionnaires();

  const [questionnaires, setQuestionnaires] = useState();

  useEffect(() => {
    if (fetchedQuestionnaires) {
      setQuestionnaires(fetchedQuestionnaires);
    }
  }, [fetchedQuestionnaires]);

  const handleCreateQuestionnaire = async () => {
    await questionnaireService.createQuestionnaire().then((response) => {
      setQuestionnaires((state) => [...state, response.data]);
    });
  };

  const handleDeleteQuestionnaire = async (id) => {
    const deletedQuestionnaire = await questionnaireService.deleteQuestionnaire(id);
    setQuestionnaires(
      questionnaires.filter((questionnaire) => questionnaire._id !== deletedQuestionnaire._id)
    );
  };

  return (
    <div>
      {!questionnaires || !questionnaires.length ? (
        <div>
          {isErrorQuestionnaires && (
            <div className="alert alert-danger d-flex justify-content-center mt-5" role="alert">
              Something went wrong...
            </div>
          )}
          {isLoadingQuestionnaires ? (
            <div className="d-flex justify-content-center mt-5">
              <Spinner />
            </div>
          ) : (
            <div className="my-5 d-flex justify-content-center">
              <OutlineButton
                title="Create Questionnaire"
                onClick={() => handleCreateQuestionnaire()}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="px-3">
          {questionnaires.map((questionnaire) => {
            return (
              <div key={questionnaire._id} className="my-3">
                <div className="px-2">
                  <QuestionnaireEditor
                    questionnaire={questionnaire}
                    deleteQuestionnaire={() => handleDeleteQuestionnaire}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionnaireEditorPage;
