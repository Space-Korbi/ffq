/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

// services
import { questionnaireService } from '../../services';

// custom hooks
import { useFetchQuestionnaires, useFetchQuestions } from '../../hooks';

// components
import Spinner from '../../components/Spinner';
import { NavTabs, NavContents } from '../../components/Navigation';
import QuestionEditor from '../../components/QuestionEditor';
import { OutlineButton } from '../../components/Button';
import QuestionnaireSettings from '../../components/Settings';
import QuestionnaireImages from '../../components/Images';
import QuestionTable from './QuestionTable';

const QuestionnaireEditor = ({ questionnaire, deleteQuestionnaire }) => {
  const [
    { fetchedQuestions, isLoadingQuestions, isErrorQuestions },
    setQuestionniareId
  ] = useFetchQuestions(questionnaire._id);

  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();

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

  const saveSettings = async (settings) => {
    await questionnaireService.updateQuestionnaire(questionnaire._id, settings).then((res) => {
      console.log(res);
    });
  };

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
              <div className="row no-gutters overflow-auto flex-row flex-nowrap my-4">
                <QuestionTable
                  data={data}
                  setSelectedQuestion={setSelectedQuestion}
                  setQuestions={setQuestions}
                  questionnaire={questionnaire}
                  questionsRef={questionsRef}
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

  const imagesContent = <QuestionnaireImages questionnaire={questionnaire} save={saveSettings} />;

  const tabNames = ['Questions', 'Settings', 'Images'];
  const tabContents = [questionsContent, settingsContent, imagesContent];

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
    await questionnaireService.createQuestionnaire().then((res) => {
      setQuestionnaires((state) => [...state, res.data.questionnaire]);
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
        <div className="m-2 m-sm-4">
          {questionnaires.map((questionnaire) => {
            return (
              <div key={questionnaire._id} className="my-3">
                <div className="">
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
