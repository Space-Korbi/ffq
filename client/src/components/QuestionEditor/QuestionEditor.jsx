/* eslint-disable no-restricted-syntax */
import React, { useState, useReducer } from 'react';
import { string, shape, arrayOf, number, exact } from 'prop-types';
import { nanoid } from 'nanoid';

import { NavTabs, NavContents } from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import QuestionPreview from './QuestionPreview';
import Select from '../Select';
import { answerReducer } from '../../helpers';

import { questionService } from '../../services';
import AnswerEditor from '../AnswerEditor/AnswerEditor';

const tabNames = ['Edit', 'Arrange'];

const QuestionEditor = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState('');
  const [answerOptions, dispatch] = useReducer(answerReducer, question.answerOptions);

  const editor = (
    <div className="row no-gutters my-3">
      <div className="col-lg mx-3">
        <div className="my-2">
          <Select onChange={setAnswerType} dispatch={dispatch} />
        </div>
        <div className="my-4">
          <JumbotronInputs
            onChangeTitle={setTitle}
            onChangeSubtitle={setSubtitle1}
            onChangeComment={setSubtitle2}
          />
          <HelpTextInput onChange={setHelp} />
        </div>
        <AnswerEditor answerOptions={answerOptions} answerType={answerType} dispatch={dispatch} />
      </div>

      <div className="col col-lg-5 px-0 mx-lg-3">
        <div className="text-center my-2">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() =>
              questionService.saveQuestion(
                { questionId: nanoid(), title, index: 2, subtitle1, subtitle2, help },
                answerOptions
              )
            }
          >
            Save Question
          </button>
        </div>
        <QuestionPreview
          title={title}
          subtitle1={subtitle1}
          subtitle2={subtitle2}
          help={help}
          answerOptions={answerOptions}
          answerType={answerType}
        />
      </div>
    </div>
  );

  const arrange = (
    <div className="row">
      <div className="col">Hello World Arrangement</div>
    </div>
  );

  return (
    <div>
      <div className="m-3">
        <NavTabs tabNames={tabNames} />
      </div>
      <div>
        <NavContents tabNames={tabNames} tabContents={[editor, arrange]} />
      </div>
    </div>
  );
};

QuestionEditor.propTypes = {
  question: shape({
    questionId: string,
    index: number.isRequired,
    title: string,
    subtitle1: string,
    subtitle2: string,
    help: string,
    parentQuestion: string,
    childQuestion: arrayOf(string),
    answerOptions: shape({
      type: string.isRequired,
      frequencyAnswers: exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
      }),
      amountAnswers: arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          imageName: string,
          imageURLs: string
        })
      ),
      userInputAnswers: arrayOf(
        shape({
          id: string.isRequired,
          type: string,
          title: string
        })
      )
    }).isRequired
  })
};

// TODO index needs to be passed down from parent component
QuestionEditor.defaultProps = {
  question: {
    questionId: nanoid(),
    index: 2,
    title: '',
    subtitle1: '',
    subtitle2: '',
    help: '',
    parentQuestion: '',
    childQuestion: [''],
    answerOptions: {
      type: '',
      frequencyOptions: { left: [], right: [] },
      amountOptions: [],
      userInputOptions: []
    }
  }
};

export default QuestionEditor;
