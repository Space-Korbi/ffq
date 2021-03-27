/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { arrayOf, func, shape, string } from 'prop-types';
import { nanoid } from 'nanoid';
import moment from 'moment';

// localization
import { useTranslation } from 'react-i18next';

// components
import DateIntervalSettings from '../DateInterval';
import { AddButton } from '../Button';

const QuestionnaireSettings = ({ questionnaire, save, saveState, setSaveState }) => {
  const { t } = useTranslation(['globals']);

  const [name, setName] = useState(questionnaire.name);
  const [consentScript, setConsentScript] = useState(questionnaire.consentScript);
  const [iterations, setIterations] = useState(questionnaire.iterations);

  const addIteration = () => {
    setIterations((prevState) => [
      ...prevState,
      {
        id: nanoid(),
        start: moment().toISOString(),
        startLabel: moment().format('DD.MM.YY'),
        end: moment().toISOString(),
        endLabel: moment().format('DD.MM.YY')
      }
    ]);
  };

  return (
    <div>
      <div className="row no-gutters mt-4">
        <div className="col col-md-8 col-lg-6 col-xl-5">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              save({ name, consentScript, iterations });
            }}
          >
            {t('globals:save_settings', 'Einstellungen speichern')}
          </button>
          <div className="m-0 my-3">{saveState}</div>
          <p className="lead m-0 mb-1 mt-5">
            {t('globals:questionnaire_name', 'Name des Fragebogens')}
          </p>
          <hr className="m-0 mb-3" />
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => {
              setSaveState();
              setName(e.target.value);
            }}
            aria-describedby="inputGroup-name"
          />

          <div className="mt-5">
            <div className="d-flex flex-row align-items-end justify-content-between">
              <p className="align-bottom m-0 mb-1 lead">
                {t('globals:iteration', 'Wiederholungen')}
              </p>
              <AddButton
                onClick={() => {
                  setSaveState();
                  return addIteration();
                }}
                styling="btn btn-outline-primary ml-auto mb-1"
                tooltip="Wiederholung hinzufügen"
              />
            </div>
          </div>

          <hr className="m-0 mb-3" />
          <DateIntervalSettings
            iterations={iterations}
            setIterations={setIterations}
            setSaveState={setSaveState}
          />

          <p className="lead m-0 mb-1 mt-5">
            {t('globals:consent_form', 'Einverständniserklärung')}
          </p>
          <hr className="m-0 mb-3" />
          <textarea
            className="form-control"
            id="consentText"
            rows="6"
            value={consentScript}
            onChange={(e) => {
              setSaveState();
              setConsentScript(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

QuestionnaireSettings.propTypes = {
  questionnaire: shape({
    id: string,
    name: string,
    consentScript: string,
    iterations: arrayOf(
      shape({
        id: string,
        start: string,
        end: string
      })
    )
  }).isRequired,
  save: func.isRequired
};

export default QuestionnaireSettings;
