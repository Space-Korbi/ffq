/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { func } from 'prop-types';
import Navigation from '../Navigation';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import { FrequencyQuestion } from '../Question';
import AnswerButtons from './AnswerButtons';
import AmountQuestion from '../Question/AmountQuestion/AmountQuestion';
import AmountCardsEditor from './AmountCardsEditor';
import { appendState } from '../../helpers';

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
  { key: '1', title: '1', subtitle: '1.1' },
  { key: '2', title: '2', subtitle: '2.1', imageURL: pizzaQuarter },
  { key: '3', title: '3', subtitle: '3.1', imageURL: pizzaWhole }
];

const tabs = ['Creation', 'Order'];

const QuestionTypeSelection = ({ onChange }) => {
  return (
    <div>
      <div className="input-group my-2">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="questionTypeSelect">
            Question Type
          </label>
        </div>
        <select
          className="custom-select"
          id="questionTypeSelect"
          onChange={(e) => onChange(e.target.value)}
        >
          <option defaultValue>Choose...</option>
          <option value="frequency">Frequency Question</option>
          <option value="amount">Amount Question</option>
          <option value="userInput">User Input Question</option>
        </select>
      </div>
    </div>
  );
};

QuestionTypeSelection.propTypes = {
  onChange: func.isRequired
};

const QuestionCreation = () => {
  const [questionType, setQuestionType] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [comment, setComment] = useState('');
  const [help, setHelp] = useState(mockInformation);

  const [leftButtons, setLeftButtons] = useState(leftButtonsTextMock);
  const [rightButtons, setRightButtons] = useState(rightButtonsTextMock);

  const [amountCards, setAmountCards] = useState(mockAmountCards);

  return (
    <div className="m-4">
      <Navigation tabs={tabs} />
      <div className="tab-content" id="questionCreationContent">
        <div
          className="tab-pane fade show active"
          id={tabs[0]}
          role="tabpanel"
          aria-labelledby={`${tabs[0]}-tab`}
        >
          <div className="row no-gutters">
            <div className="col-lg m-2 ">
              <QuestionTypeSelection onChange={setQuestionType} />
              <JumbotronInputs
                onChangeTitle={setTitle}
                onChangeSubTitle={setSubTitle}
                onChangeComment={setComment}
              />
              <HelpTextInput onChange={setHelp} />
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
            <div
              className="col col-lg-5 mt-2 border border-info"
              style={{ minHeight: '800px', minWidth: '270px', maxWidth: '100%' }}
            >
              {questionType === 'frequency' && (
                <FrequencyQuestion
                  title={title}
                  subtitle={subTitle}
                  comment={comment}
                  help={help}
                  leftButtons={leftButtons}
                  rightButtons={rightButtons}
                />
              )}
              {questionType === 'amount' && (
                <AmountQuestion
                  title={title}
                  subtitle={subTitle}
                  comment={comment}
                  help={help}
                  amountCards={amountCards}
                />
              )}
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
            <div className="col">Hello World Order is Born</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreation;
