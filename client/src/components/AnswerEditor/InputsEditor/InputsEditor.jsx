import React from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { nanoid } from 'nanoid';

// localization
import { useTranslation } from 'react-i18next';

import InputEditor from './InputEditor';
import { OutlineButton } from '../../Button';
import { CardsGrid } from '../../Cards';

const InputsEditor = ({ answerOptions, dispatch }) => {
  const { t } = useTranslation(['globals']);

  const InputEditors = answerOptions.map((answerOption, index) => {
    return (
      <InputEditor
        key={answerOption.id}
        index={index + 1}
        answerOption={answerOption}
        dispatch={dispatch}
      />
    );
  });

  return (
    <div>
      <div className="my-5 text-center">
        <OutlineButton
          title={t('globals:add_text_input', 'Eingabefeld hinzufügen')}
          onClick={() =>
            dispatch({
              type: 'addTextInput',
              payload: { id: nanoid() }
            })
          }
        />
        <div>
          <CardsGrid
            Cards={InputEditors}
            gridColumns="row justify-content-between row-cols-1 row-cols-md-2 mx-n2"
          />
        </div>
      </div>
    </div>
  );
};

InputsEditor.propTypes = {
  answerOptions: arrayOf(
    shape({
      key: string,
      type: string,
      title: string
    })
  ).isRequired,
  dispatch: func.isRequired
};

export default InputsEditor;
