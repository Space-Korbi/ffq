import React from 'react';
import { arrayOf, bool, exact, oneOfType, shape, string } from 'prop-types';

import { Question } from '../Question';

const QuestionPreview = ({ title, subtitle1, subtitle2, help, answerOptions }) => {
  return (
    <div className="mt-4">
      <span className="badge badge-info">Preview</span>
      <div
        className="border border-info "
        style={{ minHeight: '760px', minWidth: '270px', maxWidth: '100%' }}
      >
        <Question
          id=""
          title={title}
          subtitle1={subtitle1}
          subtitle2={subtitle2}
          help={help}
          answerOptions={answerOptions}
          // eslint-disable-next-line no-console
          onSubmitAnswer={() => console.log('Answer submitted')}
        />
      </div>
    </div>
  );
};

QuestionPreview.propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired,
  help: string.isRequired,
  answerOptions: shape({
    type: string.isRequired,
    options: oneOfType([
      exact({
        left: arrayOf(shape({ id: string.isRequired, title: string })),
        right: arrayOf(shape({ id: string.isRequired, title: string }))
      }),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          imageName: string,
          imageURL: string
        })
      ),
      arrayOf(
        shape({
          id: string.isRequired,
          title: string,
          hasNumberInput: bool,
          numberInputTitle: string
        })
      )
    ]).isRequired
  }).isRequired
};

export default QuestionPreview;
