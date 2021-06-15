/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, shape, exact, bool, oneOfType } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import ButtonsEditor from './ButtonsEditor/ButtonsEditor';
import CardsEditor from './CardsEditor/CardsEditor';
import InputsEditor from './InputsEditor/InputsEditor';
import AnswerType from '../../types';
import QuestionnaireImages from '../Images';

const AnswerEditor = ({ answerOptions, dispatch, answerType, modalTable }) => {
  const { t } = useTranslation(['globals']);

  const [editor, setEditor] = useState(<div />);

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        setEditor(
          <div>
            <ButtonsEditor
              answerOptions={answerOptions}
              dispatch={dispatch}
              modalTable={modalTable}
            />
          </div>
        );
        break;
      case AnswerType.Amount:
        setEditor(
          <div>
            <CardsEditor answerOptions={answerOptions.options} dispatch={dispatch} />
          </div>
        );
        break;
      case AnswerType.UserInput:
        setEditor(
          <div>
            <InputsEditor answerOptions={answerOptions.options} dispatch={dispatch} />
          </div>
        );
        break;
      case 'images':
        setEditor(
          <div>
            <QuestionnaireImages prevUploads={answerOptions.options} dispatch={dispatch} />
          </div>
        );
        break;
      default:
        setEditor(
          <div className="alert alert-info text-center m-5" role="alert">
            {t('globals:choose_answer_type', 'Wähle eine Antwortart')}
          </div>
        );
    }
  }, [answerType, answerOptions]);

  return <div>{editor}</div>;
};

AnswerEditor.propTypes = {
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
  }).isRequired,
  dispatch: func.isRequired,
  answerType: string.isRequired
};

export default AnswerEditor;
