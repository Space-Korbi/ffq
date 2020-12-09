/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { func } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Navigation from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import { Question, AmountAnswer, FrequencyAnswer } from '../Question';
import AnswerButtons from './AnswerButtons';
import AmountCardsEditor from './AmountCardsEditor';
import { AnswerType, appendState } from '../../helpers';
import { insertQuestion } from '../../api';

import pizzaWhole from '../../images/pizza-whole-example.jpg';
// import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';
const leftButtonsTextMock = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche',
  '2 - 4 Mal pro Woche',
  '5 - 6 Mal pro Woche'
];
const rightButtonsTextMock = ['1 Mal pro Tag', '2 Mal pro Tag', '3 - 4 Mal pro Tag', '5+ pro Tag'];

const mockAmountCards = [
  { key: '1', title: '1', subtitle1: '1.1' },
  { key: '2', title: '2', subtitle1: '2.1', imageURL: pizzaQuarter },
  { key: '3', title: '3', subtitle1: '3.1', imageURL: pizzaWhole }
];

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

const QuestionEditor = () => {
  const [questionType, setQuestionType] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle1, setSubtitle1] = useState('');
  const [subtitle2, setSubtitle2] = useState('');
  const [help, setHelp] = useState('');
  const [answerOptions, setAnswerOptions] = useState(<div />);

  const [leftButtons, setLeftButtons] = useState(leftButtonsTextMock);
  const [rightButtons, setRightButtons] = useState(rightButtonsTextMock);

  const [amountCards, setAmountCards] = useState(mockAmountCards);

  const setAnswerType = (type) => {
    setQuestionType(type);
    switch (type) {
      case AnswerType.Frequency:
        setAnswerOptions(
          <div>
            <FrequencyAnswer leftButtons={leftButtons} rightButtons={rightButtons} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerOptions(
          <div>
            <AmountAnswer answerCards={amountCards} />
          </div>
        );
        break;
      case AnswerType.UserInput:
        setAnswerOptions(<div>User Input Question</div>);
        break;
      default:
        setAnswerOptions(<div>Default Question</div>);
    }
  };

  const handleIncludeQuestion = async () => {
    const questionUUID = uuidv4();
    const index = 0;
    const category = 'No catergory yet';
    const possibleAnswers = leftButtons.concat(rightButtons);

    const payload = {
      questionUUID,
      index,
      questionType,
      title,
      subtitle1,
      subtitle2,
      help,
      category,
      possibleAnswers
    };

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
                {questionType === 'frequency' && (
                  <AnswerButtons
                    leftButtons={leftButtons}
                    rightButtons={rightButtons}
                    onChangeLeft={setLeftButtons}
                    onChangeRight={setRightButtons}
                  />
                )}
                {questionType === 'amount' && (
                  <AmountCardsEditor
                    amountCards={amountCards}
                    onChange={setAmountCards}
                    addAmountCard={(element) => appendState(element, amountCards, setAmountCards)}
                  />
                )}
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
                  className="my-4 border border-info"
                  style={{ minHeight: '800px', minWidth: '270px', maxWidth: '100%' }}
                >
                  <Question
                    title={title}
                    subtitle1={subtitle1}
                    subtitle2={subtitle2}
                    help={help}
                    answerOptions={answerOptions}
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

export default QuestionEditor;
