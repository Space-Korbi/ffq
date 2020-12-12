/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useState, useReducer } from 'react';
import { func, string, shape, arrayOf, number, oneOfType } from 'prop-types';
import { nanoid } from 'nanoid';
import Navigation from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import { Question } from '../Question';

import { AnswerType, reducerHelper } from '../../helpers';
import { insertQuestion } from '../../api';
import AnswerEditor from './AnswerEditor';
import UserInputAnswer from '../Question/UserInputAnswer/UserInputAnswer';

import pizzaWhole from '../../images/pizza-whole-example.jpg';
// import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

const mockAmountCards = [
  { id: '1', title: '1', subtitle1: '1.1' },
  { id: '2', title: '2', subtitle1: '2.1', imageURL: pizzaQuarter },
  { id: '3', title: '3', subtitle1: '3.1', imageURL: pizzaWhole }
];

const leftButtonsTextMock = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche'
];
const rightButtonsTextMock = ['1 Mal pro Tag', '5+ pro Tag'];

const tabs = ['Edit', 'Arrange'];

const AnswerTypeSelection = ({ onChange }) => {
  return (
    <div>
      <div className="input-group my-2">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="questionTypeSelect">
            Answer Type
          </label>
        </div>
        <select
          className="custom-select"
          id="questionTypeSelect"
          onChange={(e) => onChange(e.target.value)}
        >
          <option defaultValue>Choose...</option>
          <option value={AnswerType.Frequency}>Buttons</option>
          <option value={AnswerType.Amount}>Cards</option>
          <option value={AnswerType.UserInput}>User Input</option>
        </select>
      </div>
    </div>
  );
};

AnswerTypeSelection.propTypes = {
  onChange: func.isRequired
};

const answersReducer = (state, action) => {
  console.log('State', state);
  console.log('Action', action);
  switch (action.type) {
    case 'addButton': {
      return reducerHelper.addButton(state, action);
    }
    case 'removeButton': {
      return reducerHelper.removeButton(state, action);
    }
    case 'changeButtonTitle': {
      return reducerHelper.changeButtonTitle(state, action);
    }
    case 'addCardText':
      return { type: AnswerType.Amount, options: [] };
    case 'addCardImage':
      return state;
    default:
      return state;
  }
};

const initialAnswers = {
  type: '',
  frequencyOptions: { left: [], right: [] },
  amountOptions: [],
  userInputOptions: {}
};

const QuestionEditor = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState('');
  const [answers, dispatch] = useReducer(answersReducer, initialAnswers);

  const handleIncludeQuestion = async () => {
    const { index, questionUUID } = question;

    const answersLeft = answers.options.left.map((buttonTitle) => {
      return { name: buttonTitle, skip: [], imageURL: '' };
    });
    const answersRight = answers.options.left.map((buttonTitle) => {
      return { name: buttonTitle, skip: [], imageURL: '' };
    });

    const selectableAnswers = {
      frequency: { leftColumn: answersLeft, rightColumn: answersRight }
    };

    const payload = {
      questionUUID,
      index,
      title,
      subtitle1,
      subtitle2,
      help,
      selectableAnswers
    };

    console.log(payload);

    await insertQuestion(payload).then(() => {
      window.alert(`Question inserted successfully`);
    });
  };

  return (
    <div>
      <div className="m-3">
        <Navigation tabs={tabs} />
      </div>
      <div>
        <div className="tab-content" id="questionEditorContent">
          <div
            className="tab-pane fade show active"
            id={tabs[0]}
            role="tabpanel"
            aria-labelledby={`${tabs[0]}-tab`}
          >
            <div className="row no-gutters my-3">
              <div className="col-lg mx-3">
                <div className="my-2">
                  <AnswerTypeSelection onChange={setAnswerType} />
                </div>
                <div className="my-4">
                  <JumbotronInputs
                    onChangeTitle={setTitle}
                    onChangeSubtitle={setSubtitle1}
                    onChangeComment={setSubtitle2}
                  />
                </div>
                <div className="my-4">
                  <HelpTextInput onChange={setHelp} />
                </div>
                <AnswerEditor answers={answers} answerType={answerType} dispatch={dispatch} />
              </div>

              <div className="col col-lg-5 px-0 mx-lg-3">
                <div className="text-center my-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleIncludeQuestion()}
                  >
                    Save Question
                  </button>
                </div>

                <div
                  className="mt-4 border border-info "
                  style={{ minHeight: '760px', minWidth: '270px', maxWidth: '100%' }}
                >
                  <Question
                    title={title}
                    subtitle1={subtitle1}
                    subtitle2={subtitle2}
                    help={help}
                    answers={answers}
                    answerType={answerType}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade show "
            id={tabs[1]}
            role="tabpanel"
            aria-labelledby={`${tabs[1]}-tab`}
          >
            <div className="row">
              <div className="col">Hello World Arrangement is Born</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Needs refactoring
 * doesnt fit current data object
 * Also schema needs to be updated too.
 */
QuestionEditor.propTypes = {
  question: shape({
    questionUUID: string,
    index: number.isRequired,
    title: string,
    subtitle1: string,
    subtitle2: string,
    help: string,
    parentQuestion: string,
    childQuestion: arrayOf(string),
    selectableAnswers: shape({
      frequency: shape({
        leftColumn: { options: arrayOf(string) },
        rightColumn: { options: arrayOf(string) }
      }),
      amount: shape({
        options: arrayOf(
          shape({
            id: string.isRequired,
            title: string,
            subtitle: string,
            imageURL: string
          })
        )
      }),
      userInput: oneOfType([string, number])
    })
  })
};

QuestionEditor.defaultProps = {
  question: {
    questionUUID: nanoid(),
    index: 2,
    title: '',
    subtitle1: '',
    subtitle2: '',
    help: '',
    parentQuestion: '',
    childQuestion: ['']
  }
};

export default QuestionEditor;
