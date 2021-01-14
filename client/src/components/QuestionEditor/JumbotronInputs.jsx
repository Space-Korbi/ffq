import React from 'react';
import { func, string } from 'prop-types';

const TitleInputs = ({ value, type, onChange }) => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="jumbotron-titles-input">
          {type}
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
        <TitleInputs type="Title" value={title} onChange={onChangeTitle} />
        <TitleInputs type="Subtitle 1" value={subtitle1} onChange={onChangeSubtitle} />
        <TitleInputs type="Subtitle 2" value={subtitle2} onChange={onChangeComment} />
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
