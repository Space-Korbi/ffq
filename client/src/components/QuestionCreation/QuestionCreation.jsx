import React, { useState } from 'react';
import Navigation from '../Navigation';
import { FrequencyQuestion } from '../Question';
import JumbotronInputs from './JumbotronInputs';
import HelpTextInput from './HelpTextInput';
import AnswerButtons from './AnswerButtons';

const tabs = ['Creation', 'Order'];

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

const QuestionCreation = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [comment, setComment] = useState('');
  const [help, setHelp] = useState(mockInformation);

  const [leftButtons, setLeftButtons] = useState(leftButtonsTextMock);
  const [rightButtons, setRightButtons] = useState(rightButtonsTextMock);

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
            <div className="col-lg-6 m-2 ">
              <JumbotronInputs
                onChangeTitle={setTitle}
                onChangeSubTitle={setSubTitle}
                onChangeComment={setComment}
              />

              <HelpTextInput onChange={setHelp} />
              <AnswerButtons
                leftButtons={leftButtons}
                rightButtons={rightButtons}
                onChangeLeft={setLeftButtons}
                onChangeRight={setRightButtons}
              />
            </div>
            <div className="col mt-2 border border-info">
              <FrequencyQuestion
                title={title}
                subtitle={subTitle}
                comment={comment}
                help={help}
                leftButtons={leftButtons}
                rightButtons={rightButtons}
              />
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
