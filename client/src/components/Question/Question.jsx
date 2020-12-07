/* eslint-disable no-unused-vars */
import React from 'react';
import { string } from 'prop-types';
import Help from './Help';
import FrequencySelection from './FrequencySelection';
import Jumbotron from './Jumbotron';

const mockInformation =
  'Bitte geben Sie die Verzehrshäufigkeiten des Lebensmittels an, indem Sie das passende Kästchen unten durch einmaliges Anklicken auswählen';

const Question = ({ title, subtitle, comment, help }) => {
  return (
    <div>
      <div className="">
        <Jumbotron title={title} subtitle={subtitle} comment={comment} />
      </div>
      <div className="row no-gutters">
        <div className="col d-flex justify-content-end">
          <Help infoText={help} />
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

Question.propTypes = {
  title: string,
  subtitle: string,
  comment: string,
  help: string
};

Question.defaultProps = {
  title: '',
  subtitle: '',
  comment: '',
  help: ''
};

export default Question;
