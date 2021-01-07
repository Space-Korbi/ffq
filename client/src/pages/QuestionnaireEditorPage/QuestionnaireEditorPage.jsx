/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker';

import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import QuestionEditor from '../../components/QuestionEditor';

import {
  DeleteButton,
  EditButton,
  CopyButton,
  MoveButton,
  OutlineButton
} from '../../components/Button';
import RemovableListItem from '../../components/List';

import { questionService, questionnaireService } from '../../services';

const QuestionnaireEditor = ({ questionnaireId, deleteQuestionnaire }) => {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();

  const [questionnaireName, setQuestionnnaireName] = useState('New Quesionnaire');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const questionsRef = useRef(questions);

  useEffect(() => {
    setIsLoading(true);
    // fetch all metaData of questionnaire too
    const fetchQuestions = async () => {
      const fetchedQuestions = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
        questionnaireId
      );
      setQuestions(fetchedQuestions);
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

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
    questionsRef.current = questions;
    const rowData = prepareRows(questions);
    setData(rowData);
  }, [questions]);

  const handleCreateQuestionAt = async (index) => {
    await questionnaireService.createQuestionAt(questionnaireId, index).then((response) => {
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
        .moveQuestionFromTo(questionnaireId, question, fromIndex, toIndex)
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
      .removeQuestionById(questionnaireId, question._id)
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

  const handleChangeSettings = async () => {
    console.log('saving');
    const settings = { name: questionnaireName, startDate, endDate };
    await questionnaireService
      .updateQuestionnaireSettings(questionnaireId, settings)
      .then((response) => {
        console.log(response);
      });
  };

  const deleteButton = (cell, row) => {
    return (
      <div className="d-flex justify-content-center">
        <DeleteButton
          isTrashCan
          isDeleting={isDeleting}
          onClick={() => handleRemoveQuestion(row.question, row.index)}
        />
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
        <EditButton onClick={() => setSelectedQuestion(row.question)} />
      </div>
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
      dataField: 'move',
      text: '',
      editable: false,
      align: 'center',
      style: { width: '12px' },
      formatter: moveButtons
    },
    {
      dataField: 'delete',
      text: '',
      editable: false,
      align: 'center',
      style: { width: '12px' },
      formatter: deleteButton
    }
  ];

  return (
    <div>
      {isEditing ? (
        <QuestionEditor question={selectedQuestion} onExit={() => setIsEditing(false)} />
      ) : (
        <>
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              <div className="row d-flex no-gutters">
                <div className="col align-items-center">
                  {/* <div className="mb-4 d-flex justify-content-end">
                    <DeleteButton isTrashCan onClick={() => deleteQuestionnaire(questionnaireId)} />
                  </div> */}
                  <div className="my-1 d-inline-flex">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-name">
                          Name
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        value={questionnaireName}
                        onChange={(e) => setQuestionnnaireName(e.target.value)}
                        aria-describedby="inputGroup-name"
                      />
                    </div>
                  </div>
                  <div className="my-1 d-flex">
                    <label className="form-check-label mx-1" htmlFor="inlineFormCheck">
                      Start Date
                    </label>
                    <DatePicker onChange={setStartDate} value={startDate} />
                  </div>
                  <div className="my-1 d-flex">
                    <label className="form-check-label mx-1" htmlFor="inlineFormCheck">
                      End Date
                    </label>
                    <DatePicker onChange={setEndDate} value={endDate} />
                  </div>
                </div>
              </div>
              <div className="row d-flex no-gutters mt-3">
                <div className="col d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleChangeSettings();
                    }}
                  >
                    Save Settings
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      handleCreateQuestionAt();
                    }}
                  >
                    Add Question
                  </button>
                </div>
              </div>
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
            </>
          )}
        </>
      )}
    </div>
  );
};

const QuestionnaireEditorPage = (props) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      const fetchedQuestionnaires = await questionnaireService.fetchAllQuestionnaires();
      setQuestionnaires(fetchedQuestionnaires);
    };
    fetchQuestionnaire();
  }, []);

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

  const removeQuestion = (id) => {
    setSelectedQuestions((state) => {
      const filtered = state.filter((selectedQuestion) => selectedQuestion !== id);
      return filtered;
    });
  };

  const handleOnChange = (e, id) => {
    if (e.target.checked) {
      setSelectedQuestions((state) => [...state, id]);
    }

    if (!e.target.checked) {
      removeQuestion(id);
    }
  };

  return (
    <div>
      <div className="m-lg-5">
        {questionnaires && questionnaires.length ? (
          questionnaires.map((questionnaire) => {
            return (
              <div key={questionnaire._id} className="my-3">
                <div className="px-2">
                  <QuestionnaireEditor
                    questionnaireId={questionnaire._id}
                    deleteQuestionnaire={() => handleDeleteQuestionnaire}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="my-5 d-flex justify-content-center">
            <OutlineButton
              title="Create Questionnaire"
              onClick={() => handleCreateQuestionnaire()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

QuestionnaireEditorPage.propTypes = {};

export default QuestionnaireEditorPage;
