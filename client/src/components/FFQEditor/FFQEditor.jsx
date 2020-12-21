/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { questionService } from '../../services';

import { NavTabs, NavContents } from '../Navigation';
import { OutlineButton, DeleteButton } from '../Button';
import { Table } from '../Table';
import AnswerType from '../../types';

const tabNames = ['Edit', 'Settings'];

const addQuestion = () => {
  console.log('addQuestion');
};

const FFQEditor = () => {
  const { path, url, params } = useRouteMatch();
  const history = useHistory();

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

  const editQuestion = (id) => {
    console.log(id);
    console.log(url);
    console.log(params);
    history.push('/dashboard/');

    // <Link to={`${url}/movies/update/${id}`} className="btn btn-outline-warning btn-sm">
    // Update
    // </Link>
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
          <OutlineButton title="Edit" onClick={() => editQuestion(original.questionId)} />
        )
      },
      {
        Header: 'Delete',
        accessor: 'delete',
        Cell: ({ row: { original } }) => (
          <div className="d-flex justify-content-center my-auto">
            <DeleteButton isTrashCan onClick={() => deleteQuestion(original._id)} />
          </div>
        )
      }
    ],
    []
  );

  const parseAnswerOptions = (answerOptions) => {
    if (answerOptions.type === AnswerType.Frequency) {
      return (
        <>
          <strong>{'Left: '}</strong>
          {answerOptions.options.left.map((option, index) => {
            if (index === 0) {
              return `${option.title}`;
            }
            return `, ${option.title} `;
          })}
          <br />
          <strong>{'Right: '}</strong>
          {answerOptions.options.right.map((option, index) => {
            if (index === 0) {
              return `${option.title}`;
            }
            return `, ${option.title} `;
          })}
        </>
      );
    }
    return (
      <>
        {answerOptions.options.map((option, index) => {
          if (option.imageURL) {
            if (index === 0) {
              return <i>Image </i>;
            }
            return <i>, Image </i>;
          }
          if (index === 0) {
            return `${option.title}`;
          }
          return `, ${option.title} `;
        })}
      </>
    );
  };

  const data = React.useMemo(() => {
    const questionRow = questions.map((question) => {
      return {
        _id: question._id,
        questionId: question.questionId,
        index: question.index,
        title: question.title,
        subtitle1: question.subtitle1,
        subtitle2: question.subtitle2,
        help: question.help,
        answerType: question.answerOptions.type,
        answerOptions: parseAnswerOptions(question.answerOptions)
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
        {/* JSON.stringify(questions, null, 2) */}
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
