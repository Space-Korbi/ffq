import React from 'react';
import { func, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

const TitleInputs = ({ value, type, onChange }) => {
  const { t } = useTranslation(['globals']);

  const translateTitleInput = () => {
    switch (type) {
      case 'title':
        return t(('globals:title', 'Titel'));
      case 'subtitle1':
        return t(('globals:subtitle1', 'Untertitel 1'));
      case 'subtitle2':
        return t(('globals:subtitle2', 'Untertitel 2'));
      default:
        return '';
    }
  };

  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="jumbotron-titles-input">
          {translateTitleInput()}
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        value={value}
        aria-label="title input"
        aria-describedby="jumbotron-titles-input"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

TitleInputs.propTypes = {
  value: string.isRequired,
  type: string.isRequired,
  onChange: func.isRequired
};

function JumbotronInputs({
  title,
  subtitle1,
  subtitle2,
  onChangeTitle,
  onChangeSubtitle,
  onChangeComment
}) {
  return (
    <div>
      <div className="flex-column" id="inputs">
        <TitleInputs type="title" value={title} onChange={onChangeTitle} />
        <TitleInputs type="subtitle1" value={subtitle1} onChange={onChangeSubtitle} />
        <TitleInputs type="subtitle2" value={subtitle2} onChange={onChangeComment} />
      </div>
    </div>
  );
}

JumbotronInputs.propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired,
  onChangeTitle: func.isRequired,
  onChangeSubtitle: func.isRequired,
  onChangeComment: func.isRequired
};

export default JumbotronInputs;
