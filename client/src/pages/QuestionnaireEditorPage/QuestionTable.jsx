/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

// localization
import { useTranslation } from 'react-i18next';

// services
import { questionnaireService } from '../../services';

// components
import { AddButton, DeleteButton, EditButton, MoveButton } from '../../components/Button';

const QuestionTable = ({
  data,
  setSelectedQuestion,
  setQuestions,
  questionnaire,
  questionsRef
}) => {
  const { t } = useTranslation(['globals']);

  const handleMoveQuestionFromTo = async (question, fromIndex, toIndex) => {
    if (toIndex >= 0 && toIndex < questionsRef.current.length) {
      await questionnaireService.moveQuestion(questionnaire._id, question._id, toIndex).then(() => {
        const questionsCopy = [...questionsRef.current];
        if (toIndex > fromIndex) {
          questionsCopy.splice(fromIndex, 1);
          questionsCopy.splice(toIndex, 0, question);
        } else if (toIndex < fromIndex) {
          questionsCopy.splice(toIndex, 0, question);
          questionsCopy.splice(fromIndex + 1, 1);
        }
        setQuestions(questionsCopy);
      });
    }
  };

  const handleRemoveQuestion = async (question, index) => {
    await questionnaireService
      .deleteQuestion(questionnaire._id, question._id)
      .then(() => {
        const questionsCopy = [...questionsRef.current];
        if (index > -1) {
          questionsCopy.splice(index, 1);
        }
        setQuestions(questionsCopy);
      })
      .catch((error) => {
        // TODO: Show error to user
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const handleCreateQuestionAt = async (index) => {
    await questionnaireService.insertQuestion(questionnaire._id, { index }).then((response) => {
      const questionsCopy = [...questionsRef.current];
      if (index >= 0) {
        questionsCopy.splice(index, 0, response.data.question);
      } else {
        questionsCopy.push(response.data.question);
      }
      setQuestions(questionsCopy);
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
      <AddButton
        styling="btn-primary "
        onClick={() => {
          handleCreateQuestionAt();
        }}
        tooltip="Frage hinzufügen"
      />
    );
  };

  const columns = [
    {
      text: '',
      dataField: 'index',
      align: 'center',
      headerFormatter: addButton,
      style: { width: '8px' }
    },
    {
      dataField: 'edit',
      editable: false,
      align: 'center',
      formatter: editButton,
      style: { width: '45px' }
    },
    {
      dataField: 'move',
      editable: false,
      align: 'center',
      style: { width: '12px' },
      formatter: moveButtons
    },
    {
      text: t('globals:title', 'Titel'),
      dataField: 'question.title'
    },
    {
      text: t('globals:subtitle1', 'Untertitel1'),
      dataField: 'question.subtitle1'
    },
    {
      text: t('globals:subtitle2', 'Untertitel2'),
      dataField: 'question.subtitle2'
    },
    {
      text: t('globals:help', 'Hilfe'),
      dataField: 'question.help'
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
      <BootstrapTable
        keyField="index"
        data={data}
        columns={columns}
        bordered={false}
        hover
        noDataIndication="No Data"
      />
    </div>
  );
};

QuestionTable.propTypes = {};

export default QuestionTable;
