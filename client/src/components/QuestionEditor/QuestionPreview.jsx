import React from 'react';
import { arrayOf, bool, exact, oneOfType, shape, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import { Question } from '../Question';

const QuestionPreview = ({ title, subtitle1, subtitle2, help, answerOptions }) => {
  const { t } = useTranslation(['globals']);

  return (
    <div className="mt-n2">
      <span className="badge badge-info"> {t(('globals:preview', 'Vorschau'))}</span>
      <div
        className="border border-info "
        style={{ minHeight: '760px', minWidth: '270px', maxWidth: '100%' }}
      >
        {answerOptions.type === 'images' ? (
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">{t(('globals:images', 'Bilder'))}</h1>
              <p className="lead">
                {t(
                  ('globals:preview_not_possible',
                  `Eine Vorschau der Bilder ist hier momentan nicht verfügbar. Um eine Vorschau zu sehen gehen Sie auf 'FFQ Vorschau'.`)
                )}
              </p>
            </div>
          </div>
        ) : (
          <Question
            id=""
            title={title}
            subtitle1={subtitle1}
            subtitle2={subtitle2}
            help={help}
            answerOptions={answerOptions}
            // eslint-disable-next-line no-console
            onSubmitAnswer={() => console.log('Answer submitted')}
            isPreview
          />
        )}
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
