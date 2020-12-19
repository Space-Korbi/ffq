/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState, useReducer } from 'react';
import { func, string, shape, arrayOf, number, exact } from 'prop-types';
import { nanoid } from 'nanoid';
import Navigation from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import { Question } from '../Question';

import { AnswerType, reducerHelper } from '../../helpers';
import { insertQuestion, uploadImage } from '../../api';

import AnswerEditor from '../AnswerEditor/AnswerEditor';

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
  switch (action.type) {
    case 'ButtonOutline':
      return reducerHelper.ButtonOutline(state, action);
    case 'removeButton':
      return reducerHelper.removeButton(state, action);
    case 'changeButtonTitle':
      return reducerHelper.changeButtonTitle(state, action);
    case 'addCard':
      return reducerHelper.addCard(state, action);
    case 'removeCard':
      return reducerHelper.removeCard(state, action);
    case 'changeCardTitle':
      return reducerHelper.changeCardTitle(state, action);
    case 'changeCardImage':
      return reducerHelper.changeCardImage(state, action);
    case 'removeCardImage':
      return reducerHelper.removeCardImage(state, action);
    case 'addTextInput':
      return reducerHelper.addTextInput(state, action);
    case 'removeTextInput':
      return reducerHelper.removeTextInput(state, action);
    case 'changeTextInputTitle':
      return reducerHelper.changeTextInputTitle(state, action);
    case 'addNumberInput':
      return reducerHelper.addNumberInput(state, action);
    case 'removeNumberInput':
      return reducerHelper.removeNumberInput(state, action);
    case 'changeNumberInputTitle':
      return reducerHelper.changeNumberInputTitle(state, action);
    default:
      return state;
  }
};

const setDBImagePath = async (amountOptions) => {
  const amountOptionsWithDBImagePaths = await Promise.all(
    amountOptions.map(async (amountOption) => {
      if (!amountOption.imageData) {
        const amountOptionWithText = {
          id: amountOption.id,
          title: amountOption.title
        };
        return Promise.resolve(amountOptionWithText);
      }

      const data = new FormData();
      data.append('imageData', amountOption.imageData);

      const response = await uploadImage(data);
      const imageName = response;
      const amountOptionWithImagePath = {
        id: amountOption.id,
        imageName: imageName.data.filename,
        imageURL: imageName.data.path
      };

      return Promise.resolve(amountOptionWithImagePath);
    })
  );

  return amountOptionsWithDBImagePaths;
};

const QuestionEditor = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState('');
  const [answerOptions, dispatch] = useReducer(answersReducer, question.answerOptions);

  const handleSaveQuestion = async () => {
    const { index, questionId } = question;

    let newAnswerOptions = {};

    switch (answerType) {
      case AnswerType.Frequency:
        newAnswerOptions = {
          type: AnswerType.Frequency,
          frequencyOptions: answerOptions.frequencyOptions,
          amountOptions: [],
          userInputOptions: []
        };
        break;
      case AnswerType.Amount:
        newAnswerOptions = {
          type: AnswerType.Amount,
          frequencyOptions: { left: [], right: [] },
          amountOptions: await setDBImagePath(answerOptions.amountOptions),
          userInputOptions: []
        };
        break;
      case AnswerType.UserInput:
        newAnswerOptions = {
          type: AnswerType.UserInput,
          frequencyOptions: { left: [], right: [] },
          amountOptions: [],
          userInputOptions: answerOptions.userInputOptions
        };
        break;
      default:
        // eslint-disable-next-line
        console.log('OOPS');
    }

    const payload = {
      questionId,
      index,
      title,
      subtitle1,
      subtitle2,
      help,
      parentQuestion: '',
      childQuestion: [],
      answerOptions: newAnswerOptions
    };
    // eslint-disable-next-line
    console.log('Payload', payload);

    await insertQuestion(payload).then(() => {
      // eslint-disable-next-line
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
                  <HelpTextInput onChange={setHelp} />
                </div>
                <AnswerEditor
                  answerOptions={answerOptions}
                  answerType={answerType}
                  dispatch={dispatch}
                />
              </div>

              <div className="col col-lg-5 px-0 mx-lg-3">
                <div className="text-center my-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleSaveQuestion()}
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
                    answerOptions={answerOptions}
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
