/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes, { func } from 'prop-types';

import { questionService } from '../../services';

import { NavTabs, NavContents } from '../Navigation';
import { OutlineButton } from '../Button';
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

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id' // accessor is the "key" in the data
      },
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
        Header: 'Answer Type',
        accessor: 'answerType'
      },
      {
        Header: 'Answer with Action',
        accessor: 'answerWithAction'
      }
    ],
    []
  );

  const data = React.useMemo(() => {
    const questionRow = questions.map((question) => {
      return {
        id: question.questionId,
        index: question.index,
        title: question.title,
        subtitle1: question.subtitle1,
        subtitle2: question.subtitle2,
        help: question.help,
        answerType: question.answerOptions.type
      };
    });
    return questionRow;
  });

  const editor = (
    <div className="row no-gutters my-5">
      <div className="col-lg text-center mx-3">
        <OutlineButton title="Add Question" onClick={() => addQuestion()} />
        <div className="my-3">
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
