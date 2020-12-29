/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';

import { DeleteButton, EditButton, CopyButton, MoveButton, OutlineButton } from '../Button';
import RemovableListItem from '../List';

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

const QuestionsList = ({ questionnaireId, removeFromList, deleteQuestionnaire }) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      const fetchedQuestions = await questionnaireService.fetchAllQuestionsOfQuestionnaire(
        questionnaireId
      );
      console.log('Fetched Questions', fetchedQuestions);
      setQuestions(fetchedQuestions);
    };
    fetchQuestion();
  }, []);

  const handleCreateQuestionAt = async (index) => {
    await questionnaireService.createQuestionAt(questionnaireId, index).then((response) => {
      const questionsCopy = [...questions];
      if (!index) {
        questionsCopy.push(response.question);
      } else {
        questionsCopy.splice(index, 0, response.question);
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

            console.log('moving ', question._id, ' from ', fromIndex, ' to index', toIndex);
            setQuestions(questionsCopy);
          }
        });
    }
  };

  return (
    <div>
      {questionnaireId ? (
        <div className="border border-warning">
          <div
            className="alert alert-primary text-center d-flex justify-content-between"
            style={{ maxWidth: '500px' }}
            role="alert"
          >
            <OutlineButton
              title="Create Question"
              onClick={() => {
                handleCreateQuestionAt();
              }}
            />
            <OutlineButton
              title="Create Question At 2"
              onClick={() => {
                handleCreateQuestionAt(2);
              }}
            />
            <DeleteButton isTrashCan onClick={() => deleteQuestionnaire(questionnaireId)} />
          </div>
          <ul className="list-group">
            {questions && questions.length ? (
              questions.map((question, index) => {
                return (
                  <div key={question._id} className="row p-2 ">
                    <div className="col">
                      <RemovableListItem
                        content={question._id}
                        onClick={() => handleRemoveQuestion(question)}
                      />
                    </div>

                    <div className="col-1 ">
                      <EditButton
                        onClick={() => {
                          console.log('editing');
                        }}
                      />
                    </div>
                    <div className="col-1 ">
                      <CopyButton
                        onClick={() => {
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
              })
            ) : (
              <div> No Questions </div>
            )}
          </ul>
        </div>
      ) : (
        <div> No Questionnaire </div>
      )}
    </div>
  );
};

const QuestionnaireEditor = (props) => {
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
    console.log('delet Questionnaire with ID', id);

    const deletedQuestionnaire = await questionnaireService.deleteQuestionnaire(id);
    console.log('deletedQuestionnaire', deletedQuestionnaire);
    setQuestionnaires(
      questionnaires.filter((questionnaire) => questionnaire._id !== deletedQuestionnaire._id)
    );
  };

  const removeQuestion = (id) => {
    console.log(id);
    setSelectedQuestions((state) => {
      const filtered = state.filter((selectedQuestion) => selectedQuestion !== id);
      return filtered;
    });
  };

  const handleOnChange = (e, id) => {
    console.log(e.target.checked);
    console.log(id);
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
                {questionnaire._id}
                <QuestionsList
                  questionnaireId={questionnaire._id}
                  deleteQuestionnaire={handleDeleteQuestionnaire}
                  removeFromList={removeQuestion}
                />
              </div>
            );
          })
        ) : (
          <div>No questionnaires </div>
        )}
      </div>
      <div className="px-2">
        <QuestionTable onSelectQuestion={handleOnChange} />
      </div>
    </div>
  );
};

QuestionnaireEditor.propTypes = {};

export default QuestionnaireEditor;
