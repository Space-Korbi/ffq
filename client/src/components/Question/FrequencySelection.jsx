import React from 'react';
import FrequencyButton from './FrequencyButton';

const leftButtonsText = [
  'Nie in den letzten 4 Wochen',
  '1 - 3 Mal in den letzten 4 Wochen',
  '1 Mal pro Woche',
  '2 - 4 Mal pro Woche',
  '5 - 6 Mal pro Woche'
];

const rightButtonsText = ['1 Mal pro Tag', '2 Mal pro Tag', '3 - 4 Mal pro Tag', '5+ pro Tag'];

const saveAnswer = () => {
  console.log('answer');
};

const FrequencySelection = () => {
  return (
    <div className="row mx-1 ">
      <div className="col-6">
        {leftButtonsText.map((button) => (
          <div key={button}>
            <FrequencyButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>

      <div className="col-6">
        {rightButtonsText.map((button) => (
          <div key={button}>
            <FrequencyButton text={button} onClick={saveAnswer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequencySelection;
