import React from 'react';
import Help from './Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from './Jumbotron';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';
const Question = () => {
  return (
    <div>
      <div className="">
        <Jumbotron />
      </div>
      <div className="row no-gutters">
        <div className="col d-flex justify-content-end">
          <Help infoText={mockInformation} />
        </div>
      </div>
      <div className="row no-gutters">
        <div className="col">
          <FrequencySelection />
        </div>
      </div>
    </div>
  );
};

export default Question;
