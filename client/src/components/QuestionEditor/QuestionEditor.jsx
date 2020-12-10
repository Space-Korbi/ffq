/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { func, string, shape, arrayOf, number, oneOfType } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Navigation from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import { Question } from '../Question';

import { AnswerType } from '../../helpers';
import { insertQuestion } from '../../api';
import AnswerEditor from './AnswerEditor';
import UserInputAnswer from '../Question/UserInputAnswer/UserInputAnswer';

import pizzaWhole from '../../images/pizza-whole-example.jpg';
// import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';

const mockAmountCards = [
  { key: '1', title: '1', subtitle1: '1.1' },
  { key: '2', title: '2', subtitle1: '2.1', imageURL: pizzaQuarter },
  { key: '3', title: '3', subtitle1: '3.1', imageURL: pizzaWhole }
];

const leftButtonsTextMock = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche'
];
const rightButtonsTextMock = ['1 Mal pro Tag', '5+ pro Tag'];

const Answer = { name: String, type: String, skip: arrayOf(number), imageURL: String };

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

const QuestionEditor = ({ question }) => {
  const [title, setTitle] = useState(question.title);
  const [subtitle1, setSubtitle1] = useState(question.subtitle1);
  const [subtitle2, setSubtitle2] = useState(question.subtitle2);
  const [help, setHelp] = useState(question.help);

  const [answerType, setAnswerType] = useState('');
  const [answers, setAnswers] = useState({
    type: '',
    options: [leftButtonsTextMock, rightButtonsTextMock]
  });
  const [frequencyAnswers, setFrequencyAnswers] = useState([
    leftButtonsTextMock,
    rightButtonsTextMock
  ]);
  const [amountAnswers, setAmountAnswers] = useState([]);
  const [userInputAnswers, setUserInputAnswers] = useState([]);

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        console.log('answerType', answerType);
        setAnswers({ type: answerType, options: [[], []] });
        break;
      case AnswerType.Amount:
        console.log('answerType', answerType);
        setAnswers({ type: answerType, options: [] });
        break;
      case AnswerType.UserInput:
        console.log('answerType', answerType);
        break;
      default:
        break;
    }
  }, [answerType]);

  const handleIncludeQuestion = async () => {
    const { index, questionUUID } = question;

    const answersLeft = answers[0].map((text) => {
      return { name: text, skip: [], imageURL: '' };
    });
    const answersRight = answers[1].map((text) => {
      return { name: text, skip: [], imageURL: '' };
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
                <AnswerEditor
                  answers={answers}
                  onChangeFrequencyAnswers={setFrequencyAnswers}
                  onChangeAmountAnswers={setAmountAnswers}
                  onChangeUserInputAnswers={setUserInputAnswers}
                />
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
                  className="mt-4 border border-info"
                  style={{ minHeight: '760px', minWidth: '270px', maxWidth: '100%' }}
                >
                  <Question
                    title={title}
                    subtitle1={subtitle1}
                    subtitle2={subtitle2}
                    help={help}
                    answers={answers}
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
        leftColumn: { options: arrayOf(Answer) },
        rightColumn: { options: arrayOf(Answer) }
      }),
      amount: shape({ options: arrayOf(Answer) }),
      userInput: oneOfType([string, number])
    })
  })
};

QuestionEditor.defaultProps = {
  question: {
    questionUUID: uuidv4(),
    index: 1,
    title: '',
    subtitle1: '',
    subtitle2: '',
    help: '',
    parentQuestion: '',
    childQuestion: ['']
  }
};

export default QuestionEditor;
