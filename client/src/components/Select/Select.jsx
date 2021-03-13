import React from 'react';
import { func, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import AnswerType from '../../types';

const Select = ({ onChange, dispatch, value }) => {
  const { t } = useTranslation(['globals']);

  const setValue = () => {
    switch (value) {
      case AnswerType.Frequency:
        return AnswerType.Frequency;
      case AnswerType.Amount:
        return AnswerType.Amount;
      case AnswerType.UserInput:
        return AnswerType.UserInput;
      case 'images':
        return 'images';
      default:
        return 'select';
    }
  };

  return (
    <>
      <div className="input-group my-2 flex-nowrap">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="select">
            {t(('globals:answer_type', 'Antwortarten'))}
          </label>
        </div>
        <select
          className="custom-select"
          id="select"
          value={setValue()}
          onChange={(e) => {
            onChange(e.target.value);
            dispatch({
              type: 'setDefaultState',
              payload: { answerType: e.target.value }
            });
          }}
          style={{ minWidth: '180px' }}
        >
          <option value="select">{t(('globals:select...', 'Auswählen...'))}</option>
          <option value={AnswerType.Frequency}>{t('globals:buttons', 'Buttons')}</option>
          <option value={AnswerType.Amount}>{t(('globals:cards', 'Karten'))}</option>
          <option value={AnswerType.UserInput}>{t(('globals:user_input', 'Eingabefelder'))}</option>
          <option value="images">{t(('globals:images', 'Bilder'))}</option>
        </select>
      </div>
    </>
  );
};

Select.propTypes = {
  onChange: func.isRequired,
  dispatch: func.isRequired,
  value: string.isRequired
};

export default Select;
