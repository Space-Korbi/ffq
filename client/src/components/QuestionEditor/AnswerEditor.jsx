import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, oneOfType, shape } from 'prop-types';

import ButtonsEditor from './ButtonsEditor';
import CardsEditor from './CardsEditor';
import { AnswerType } from '../../helpers';

const AnswerEditor = ({ answers, onChange }) => {
  const [answerEditor, setAnswerEditor] = useState(<div />);

  useEffect(() => {
    if (!answers.options) {
      return;
    }
    switch (answers.type) {
      case AnswerType.Frequency:
        if (answers.options.length !== 2) {
          return;
        }
        setAnswerEditor(
          <div>
            <ButtonsEditor answers={answers} onChange={onChange} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setAnswerEditor(
          <div>
            <CardsEditor answers={answers} onChange={onChange} />
          </div>
        );
        break;
      default:
        setAnswerEditor(
          <div className="alert alert-info text-center m-5" role="alert">
            Choose an Answer Type
          </div>
        );
    }
  }, [answers]);

  return <div>{answerEditor}</div>;
};

AnswerEditor.propTypes = {
  answers: shape({
    type: string.isRequired,
    options: oneOfType([arrayOf(arrayOf(string)), arrayOf(string)]).isRequired
  }).isRequired,
  onChange: func.isRequired
};

export default AnswerEditor;
