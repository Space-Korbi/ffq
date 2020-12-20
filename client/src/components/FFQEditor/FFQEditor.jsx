/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes, { func } from 'prop-types';

import { questionService } from '../../services';

import { NavTabs, NavContents } from '../Navigation';
import { OutlineButton, DeleteButton } from '../Button';
import { Table } from '../Table';

const tabNames = ['Edit', 'Settings'];

const addQuestion = () => {
  console.log('addQuestion');
};

const FFQEditor = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(async () => {
    const fetchedQuestions = await questionService.fetchAllQuestions();
    setQuestions(fetchedQuestions);
  }, []);

  const deleteQuestion = async (id) => {
    const response = await questionService.deleteQuestion(id);
    setQuestions(
      questions.filter((question) => question.questionId !== response.data.data.questionId)
    );
  };

  const columns = React.useMemo(
    () => [
      /* {
        Header: 'ID',
        accessor: 'id' // accessor is the "key" in the data
      }, */
      {
        Header: 'Index',
        accessor: 'index'
      },
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Subtitle1',
        accessor: 'subtitle1'
      },
      {
        Header: 'Subtitle2',
        accessor: 'subtitle2'
      },
      {
        Header: 'Help',
        accessor: 'help'
      },
      {
        Header: 'Type',
        accessor: 'answerType'
      },
      {
        Header: 'Answer Options',
        accessor: 'answerOptions'
      },

      {
        Header: 'Edit',
        accessor: 'update',
        Cell: ({ row: { original } }) => (
          <OutlineButton title="Edit" onClick={() => console.log('Editing')} />
        )
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ row: { original } }) => (
          <div className="d-flex justify-content-center my-auto">
            <DeleteButton isTrashCan onClick={() => deleteQuestion(original.id)} />
          </div>
        )
      }
    ],
    []
  );

  const data = React.useMemo(() => {
    const questionRow = questions.map((question) => {
      return {
        id: question._id,
        index: question.index,
        title: question.title,
        subtitle1: question.subtitle1,
        subtitle2: question.subtitle2,
        help: question.help,
        answerType: question.answerOptions.type,
        answerOptions: JSON.stringify(question.answerOptions.options, null, 0)
      };
    });
    return questionRow;
  });

  const editor = (
    <div className=" my-5">
      <div className="col-lg text-center">
        <OutlineButton title="Add Question" onClick={() => addQuestion()} />

        <div className="row no-gutters overflow-auto flex-row flex-nowrap my-3">
          <Table columns={columns} data={data} />
        </div>
        {JSON.stringify(questions, null, 2)}
      </div>
    </div>
  );

  return (
    <div>
      <div className="m-3">
        <NavTabs tabNames={tabNames} />
      </div>
      <div>
        <NavContents tabNames={tabNames} tabContents={[editor]} />
      </div>
    </div>
  );
};

FFQEditor.propTypes = {};

export default FFQEditor;
