/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DatePicker from 'react-date-picker';

import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

import {
  DeleteButton,
  EditButton,
  CopyButton,
  MoveButton,
  OutlineButton
} from '../../components/Button';
import RemovableListItem from '../../components/List';

import { questionService, questionnaireService } from '../../services';

const QuestionTable = ({ onSelectQuestion }) => {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await questionService.fetchAllQuestions();
      setQuestions(result);
    };
    fetchData();
  }, []);

  const prepareRows = (questionData) => {
    const rows = questionData.map((question, index) => {
      return {
        _id: question._id,
        createdAt: question.createdAt,
        title: question.title,
        subtitle1: question.subtitle1,
        subtitle2: question.subtitle2,
        help: question.help
        // answerType: question.answerOptions.type
      };
    });
    return rows;
  };

  useEffect(() => {
    const rowData = prepareRows(questions);
    setData(rowData);
  }, [questions]);

  const deleteQuestion = async (_id) => {
    const response = await questionService.deleteQuestion(_id);

    const responseId = await response.data.data._id;
    setQuestions((state) => {
      const filteredQuestions = state.filter((question) => question._id !== responseId);
      return filteredQuestions;
    });
  };

  const deleteButton = (cell, row) => {
    return (
      <div className="d-flex justify-content-center">
        <DeleteButton isTrashCan onClick={() => deleteQuestion(row._id)} />
      </div>
    );
  };

  const editButton = (cell, row) => {
    return (
      <div>
        {/* eslint-disable-next-line no-console */}
        <OutlineButton title="Edit" onClick={() => console.log('editing')} />
      </div>
    );
  };

  const checkBox = (cell, row) => {
    return (
      <div>
        <input
          type="checkbox"
          aria-label="Checkbox for following text input"
          onChange={(e) => onSelectQuestion(e, row._id)}
        />
      </div>
    );
  };

  const columns = [
    {
      text: 'ID',
      dataField: '_id' // dataField is the "key" in the data
    },
    {
      text: 'Created At',
      dataField: 'createdAt' // dataField is the "key" in the data
    },
    {
      text: 'Title',
      dataField: 'title'
    },
    {
      text: 'Subtitle1',
      dataField: 'subtitle1'
    },
    {
      text: 'Subtitle2',
      dataField: 'subtitle2'
    },
    {
      text: 'Help',
      dataField: 'help'
    },
    {
      text: 'Type',
      dataField: 'answerType'
    },
    {
      text: 'Answer Options',
      dataField: 'answerOptions'
    },
    {
      dataField: 'done',
      text: 'Include in Questionnaire',
      formatter: checkBox
    },
    {
      dataField: 'edit',
      text: 'Edit',
      editable: false,
      align: 'center',
      formatter: editButton
    },
    {
      dataField: 'delete',
      text: 'Delete',
      editable: false,
      align: 'center',
      formatter: deleteButton
    }
  ];

  return (
    <div>
      <div className="row no-gutters overflow-auto flex-row flex-nowrap my-3">
        <BootstrapTable keyField="_id" data={data} columns={columns} />
      </div>
    </div>
  );
};

const QuestionsList = ({ questionnaireId, deleteQuestionnaire }) => {
  const [questions, setQuestions] = useState([]);
  const history = useHistory();
  const { userId } = useParams();
  const [questionnaireName, setQuestionnnaireName] = useState('New Quesionnaire');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  function handleClickEdit(question) {
    history.push({
      pathname: `/users/${userId}/QuestionEditor`,
      state: { question, questionnaireId }
    });
  }

  useEffect(() => {
    // fetch all metaData of questionnaire too

    const fetchQuestions = async () => {
      const fetchedQuestions = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
        questionnaireId
      );
      setQuestions(fetchedQuestions);
    };
    fetchQuestions();
  }, []);

  const handleCreateQuestionAt = async (index) => {
    await questionnaireService.createQuestionAt(questionnaireId, index).then((response) => {
      const questionsCopy = [...questions];
      if (index >= 0) {
        questionsCopy.splice(index, 0, response.question);
      } else {
        questionsCopy.push(response.question);
      }
      setQuestions(questionsCopy);
    });
  };

  const handleRemoveQuestion = async (question) => {
    await questionnaireService
      .removeQuestionById(questionnaireId, question._id)
      .then((response) => {
        if (response.success) {
          const questionsCopy = [...questions];
          const index = questionsCopy.indexOf(question);
          if (index > -1) {
            questionsCopy.splice(index, 1);
          }
          setQuestions(questionsCopy);
        }
      });
  };

  const handleMoveQuestionFromTo = async (question, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < questions.length) {
      await questionnaireService
        .moveQuestionFromTo(questionnaireId, question._id, fromIndex, toIndex)
        .then((response) => {
          if (response.success) {
            const questionsCopy = [...questions];

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

  const handleChangeSettings = async () => {
    console.log('saving');
    const settings = { name: questionnaireName, startDate, endDate };
    console.log(settings);
    await questionnaireService
      .updateQuestionnaireSettings(questionnaireId, settings)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      {questionnaireId ? (
        <>
          <div className="card" style={{ minWidth: '23rem' }}>
            <div className="card-header">
              <div className="row d-flex justify-content-between mb-2">
                <div className="col">
                  <div className="input-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="inputGroup-sizing">
                        Name
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={questionnaireName}
                      onChange={(e) => setQuestionnnaireName(e.target.value)}
                      aria-describedby="inputGroup-sizing"
                    />
                  </div>
                </div>
                <div className="col">
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
                <div className="col-1">
                  <DeleteButton isTrashCan onClick={() => deleteQuestionnaire(questionnaireId)} />
                </div>
              </div>
              <div className="row justify-content-between">
                <div className="col d-inline-flex">
                  <div className="mr-3">
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                      Start Date
                    </label>
                    <DatePicker onChange={setStartDate} value={startDate} />
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="inlineFormCheck">
                      End Date
                    </label>
                    <DatePicker onChange={setEndDate} value={endDate} />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleChangeSettings();
                  }}
                >
                  Save Settings
                </button>
              </div>
              <form className="form-inline mt-2" />
            </div>
            <ul className="list-group">
              {questions && questions.length ? (
                questions.map((question, index) => {
                  const content = (
                    <div key={question._id} className="row p-2 ">
                      {question.title}
                      {question.answerType}
                      <div className="col-1 ">
                        <EditButton
                          onClick={() => {
                            handleClickEdit(question);
                          }}
                        />
                      </div>
                      <div className="col-1 ">
                        <CopyButton
                          onClick={() => {
                            // eslint-disable-next-line no-console
                            console.log('copying');
                          }}
                        />
                      </div>
                      <div className="col-1 d-inline">
                        <MoveButton
                          up
                          onClick={() => handleMoveQuestionFromTo(question, index, index - 1)}
                        />

                        <MoveButton
                          onClick={() => handleMoveQuestionFromTo(question, index, index + 1)}
                        />
                      </div>
                    </div>
                  );
                  return (
                    <div key={question._id}>
                      <RemovableListItem
                        content={content}
                        onClick={() => handleRemoveQuestion(question)}
                      />
                    </div>
                  );
                })
              ) : (
                <div> No Questions </div>
              )}
            </ul>
          </div>
        </>
      ) : (
        <div> No Questionnaire </div>
      )}
    </div>
  );
};

/* 
   <input
                  type="number"
                  className="form-control"
                  placeholder="Index"
                  min="1"
                  max={questions.length}
                  onChange={(e) => setInsertIndex(Number(e.target.value))}
                />
                <OutlineButton
                  title="Create Question At"
                  onClick={() => {
                    handleCreateQuestionAt(insertIndex - 1);
                  }}
                />
*/

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
      <div className="m-5">
        <OutlineButton title="Create Questionnaire" onClick={() => handleCreateQuestionnaire()} />
        {questionnaires && questionnaires.length ? (
          questionnaires.map((questionnaire) => {
            return (
              <div key={questionnaire._id} className="my-3">
                <QuestionsList
                  questionnaireId={questionnaire._id}
                  deleteQuestionnaire={handleDeleteQuestionnaire}
                />
              </div>
            );
          })
        ) : (
          <div>No questionnaires </div>
        )}
      </div>
      {/* <div className="px-2">
        <QuestionTable onSelectQuestion={handleOnChange} />
      </div> */}
    </div>
  );
};

QuestionnaireEditorPage.propTypes = {};

export default QuestionnaireEditorPage;
