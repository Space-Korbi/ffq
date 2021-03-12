import React from 'react';
import { func, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

const HelpTextInput = ({ help, onChange }) => {
  const { t } = useTranslation(['globals']);

  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="help-text-input">
          {t(('globals:help', 'Hilfe'))}
        </span>
      </div>
      <input
        type="text"
        value={help}
        className="form-control"
        aria-label="Help text input"
        aria-describedby="help-text"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

HelpTextInput.propTypes = {
  help: string.isRequired,
  onChange: func.isRequired
};

export default HelpTextInput;
