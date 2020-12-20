import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, shape, exact, bool } from 'prop-types';

import ButtonsEditor from './ButtonsEditor/ButtonsEditor';
import CardsEditor from './CardsEditor/CardsEditor';
import InputsEditor from './InputsEditor/InputsEditor';
import { AnswerType } from '../../helpers';

const AnswerEditor = ({ answerOptions, dispatch, answerType }) => {
  const [editor, setEditor] = useState(<div />);

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        setEditor(
          <div>
            <ButtonsEditor answerOptions={answerOptions.frequencyOptions} dispatch={dispatch} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setEditor(
          <div>
            <CardsEditor answerOptions={answerOptions.amountOptions} dispatch={dispatch} />
          </div>
        );
        break;
      case AnswerType.UserInput:
        setEditor(
          <div>
            <InputsEditor answerOptions={answerOptions.userInputOptions} dispatch={dispatch} />
          </div>
        );
        break;
      default:
        setEditor(
          <div className="alert alert-info text-center m-5" role="alert">
            Choose an Answer Type
          </div>
        );
    }
  }, [answerType, answerOptions]);

  return <div>{editor}</div>;
};

AnswerEditor.propTypes = {
  answerOptions: shape({
    type: string.isRequired,
    frequencyOptions: shape({
      type: string,
      options: exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
      })
    }),
    amountOptions: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        imageName: string,
        imageURL: string
      })
    ),
    userInputOptions: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        hasNumberInput: bool,
        numberInputTitle: string
      })
    )
  }).isRequired,
  dispatch: func.isRequired,
  answerType: string.isRequired
};

export default AnswerEditor;
