import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, shape, exact } from 'prop-types';

import ButtonsEditor from './ButtonsEditor/ButtonsEditor';
import CardsEditor from './CardsEditor/CardsEditor';
import { AnswerType } from '../../helpers';

const AnswerEditor = ({ answers, dispatch, answerType }) => {
  const [editorState, setEditorState] = useState(<div />);

  useEffect(() => {
    switch (answerType) {
      case AnswerType.Frequency:
        setEditorState(
          <div>
            <ButtonsEditor answers={answers.frequencyOptions} dispatch={dispatch} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setEditorState(
          <div>
            <CardsEditor answers={answers.amountOptions} dispatch={dispatch} />
          </div>
        );
        break;
      default:
        setEditorState(
          <div className="alert alert-info text-center m-5" role="alert">
            Choose an Answer Type
          </div>
        );
    }
  }, [answerType, answers]);

  return <div>{editorState}</div>;
};

AnswerEditor.propTypes = {
  answers: shape({
    type: string.isRequired,
    frequencyAnswers: shape({
      type: string,
      options: exact({
        left: arrayOf(exact({ id: string.isRequired, title: string })),
        right: arrayOf(exact({ id: string.isRequired, title: string }))
      })
    }),
    amountAnswers: arrayOf(
      shape({
        id: string.isRequired,
        title: string,
        imageURL: string
      })
    ),
    userInputAnswers: shape({})
  }).isRequired,
  dispatch: func.isRequired,
  answerType: string.isRequired
};

export default AnswerEditor;
