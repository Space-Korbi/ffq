import React from 'react';
import { func, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import * as answers from '../../constants/Answers';

const Select = ({ onChange, dispatch, value }) => {
  const { t } = useTranslation(['globals']);

  console.log('value', value);

  const setValue = () => {
    switch (value) {
      case answers.TYPE.SingleChoiceButton:
        return answers.TYPE.SingleChoiceButton;
      case answers.TYPE.Card:
        return answers.TYPE.Card;
      case answers.TYPE.TextInput:
        return answers.TYPE.TextInput;
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
            {t('globals:answer_type', 'Antwortarten')}
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
          <option value="select">{t('globals:select', 'Auswählen...')}</option>
          <option value={answers.TYPE.SingleChoiceButton}>{t('globals:buttons', 'Buttons')}</option>
          <option value={answers.TYPE.Card}>{t('globals:cards', 'Karten')}</option>
          <option value={answers.TYPE.TextInput}>{t('globals:user_input', 'Eingabefelder')}</option>
          <option value="images">{t('globals:images', 'Bilder')}</option>
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
