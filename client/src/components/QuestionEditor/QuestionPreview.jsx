import React from 'react';
import { shape, string } from 'prop-types';

import { Question } from '../Question';

const QuestionPreview = ({ title, subtitle1, subtitle2, help, answerOptions, answerType }) => {
  return (
    <>
      <div
        className="mt-4 border border-info "
        style={{ minHeight: '760px', minWidth: '270px', maxWidth: '100%' }}
      >
        <Question
          title={title}
          subtitle1={subtitle1}
          subtitle2={subtitle2}
          help={help}
          answerOptions={answerOptions}
          answerType={answerType}
        />
      </div>
    </>
  );
};

QuestionPreview.propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired,
  help: string.isRequired,
  answerType: string.isRequired,
  answerOptions: shape({}).isRequired
};

export default QuestionPreview;
