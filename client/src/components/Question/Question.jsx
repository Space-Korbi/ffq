import React from 'react';
import Help from './Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from './Jumbotron';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';
const Question = () => {
  return (
    <div>
      <div className="row d-block">
        <Jumbotron />
      </div>
      <div className="row d-flex justify-content-end mr-1">
        <Help infoText={mockInformation} />
      </div>
      <div className="row d-flex">
        <FrequencySelection />
      </div>
    </div>
  );
};

export default Question;
