import React from 'react';
import Help from './Help';
import FrequencySelection from './FrequencySelection';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';
const Question = () => {
  return (
    <div>
      <div className="d-flex justify-content-end">
        <Help infoText={mockInformation} />
      </div>
      <FrequencySelection />
    </div>
  );
};

export default Question;
