/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
import React, { useState, useReducer } from 'react';
import { string, shape, arrayOf, bool, exact, oneOfType } from 'prop-types';

import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import QuestionPreview from './QuestionPreview';
import Select from '../Select';
import { answerReducer } from '../../helpers';

import { updateQuestion } from '../../api';
import AnswerEditor from '../AnswerEditor/AnswerEditor';

const QuestionEditor = ({ question, onExit, modalTable }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState(question.answerOptions.type);
  const [answerOptions, dispatch] = useReducer(answerReducer, question.answerOptions);

  return (
    <>
      <div className="row no-gutters my-3">
        <div className="col-lg">
          <div className="my-2">
            <Select onChange={setAnswerType} dispatch={dispatch} />
          </div>
          <div className="my-4">
            <JumbotronInputs
              title={title}
              subtitle1={subtitle1}
              subtitle2={subtitle2}
              onChangeTitle={setTitle}
              onChangeSubtitle={setSubtitle1}
              onChangeComment={setSubtitle2}
            />
            <HelpTextInput help={help} onChange={setHelp} />
          </div>
          <AnswerEditor
            answerOptions={answerOptions}
            answerType={answerType}
            dispatch={dispatch}
            modalTable={modalTable}
          />
        </div>
        <div className="col col-lg-5 px-0 mx-lg-3">
          <div className="text-center my-2">
            <button
              type="button"
              className="btn btn-outline-primary mr-2"
              onClick={() =>
                updateQuestion(question._id, {
                  title,
                  subtitle1,
                  subtitle2,
                  help,
                  answerOptions
                }).then(() => {
                  onExit({ _id: question._id, title, subtitle1, subtitle2, help, answerOptions });
                })
              }
            >
              Save and Exit
            </button>
            {/* TODO: link to or create next question" 
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => onExit(question)}
            >
              Save and Next
            </button> */}
          </div>

          <QuestionPreview
            title={title}
            subtitle1={subtitle1}
            subtitle2={subtitle2}
            help={help}
            answerOptions={answerOptions}
          />
        </div>
      </div>
    </>
  );
};

QuestionEditor.propTypes = {
  question: shape({
    _id: string,
    title: string,
    subtitle1: string,
    subtitle2: string,
    help: string,
    answerOptions: shape({
      type: string.isRequired,
      options: oneOfType([
        exact({
          left: arrayOf(shape({ id: string.isRequired, title: string })),
          right: arrayOf(shape({ id: string.isRequired, title: string }))
        }),
        arrayOf(
          shape({
            id: string.isRequired,
            title: string,
            imageName: string,
            imageURL: string
          })
        ),
        arrayOf(
          shape({
            id: string.isRequired,
            title: string,
            hasNumberInput: bool,
            numberInputTitle: string
          })
        )
      ])
    })
  }).isRequired
};

export default QuestionEditor;
