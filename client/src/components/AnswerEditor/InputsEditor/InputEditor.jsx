import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

import { DeleteButton } from '../../Button';
import TextEditor from '../../TextEditor';
import { EditorCard } from '../../Cards';

const InputEditor = ({ index, answerOption, dispatch }) => {
  const { t } = useTranslation(['globals']);

  const tabNames = [t(('globals:text_input', 'Eingabefeld')), t(('globals:optional', 'Optional'))];

  const mainTabContent = (
    <TextEditor
      placeholder={t(('globals:text_input_title', 'Eingabetitel'))}
      value={answerOption.title}
      onChange={(value) => {
        dispatch({
          type: 'changeTextInputTitle',
          payload: { id: answerOption.id, title: value }
        });
      }}
    />
  );

  const optionalTabContent = (
    <div>
      {answerOption.hasNumberInput ? (
        <div className="row d-flex no-gutters flex-row">
          <div className="d-flex flex-fill">
            <div className="flex-grow-1">
              <TextEditor
                placeholder={t(('globals:unit_of_measurement', 'Maßeinheit'))}
                value={answerOption.numberInputTitle}
                onChange={(value) => {
                  dispatch({
                    type: 'changeNumberInputTitle',
                    payload: { id: answerOption.id, numberInputTitle: value }
                  });
                }}
              />
            </div>
            <div className="align-self-center ml-2">
              <DeleteButton
                onClick={() =>
                  dispatch({
                    type: 'removeNumberInput',
                    payload: { id: answerOption.id }
                  })
                }
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({
              type: 'addNumberInput',
              payload: {
                id: answerOption.id,
                numberInputTitle: 'mg'
              }
            })
          }
        >
          {t(('globals:add_number_input', 'Mengeneingabe hinzufügen'))}
        </button>
      )}
    </div>
  );

  const removeCard = () => {
    dispatch({
      type: 'removeTextInput',
      payload: { id: answerOption.id }
    });
  };

  return (
    <div className="col my-3 px-2">
      <EditorCard
        index={index}
        tabNames={tabNames}
        tabContents={[mainTabContent, optionalTabContent]}
        removeCard={removeCard}
      />
    </div>
  );
};

InputEditor.propTypes = {
  index: number.isRequired,
  answerOption: shape({
    id: string.isRequired,
    title: string,
    hasNumberInput: bool
  }).isRequired,
  dispatch: func.isRequired
};

export default InputEditor;
