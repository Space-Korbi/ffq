import React, { useState, useEffect } from 'react';
import { arrayOf, func, string, oneOfType, shape } from 'prop-types';

import ButtonsEditor from './ButtonsEditor';
import CardsEditor from './CardsEditor';
import { AnswerType } from '../../helpers';

const AnswerEditor = ({ answers, onChange }) => {
  const [editorState, setEditorState] = useState(<div />);

  useEffect(() => {
    if (!answers.options) {
      return;
    }
    switch (answers.type) {
      case AnswerType.Frequency:
        if (answers.options.length !== 2) {
          return;
        }
        setEditorState(
          <div>
            <ButtonsEditor answers={answers} onChange={onChange} />
          </div>
        );
        break;
      case AnswerType.Amount:
        setEditorState(
          <div>
            <CardsEditor answers={answers} onChange={onChange} />
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
  }, [answers]);

  return <div>{editorState}</div>;
};

AnswerEditor.propTypes = {
  answers: shape({
    type: string.isRequired,
    options: oneOfType([
      arrayOf(arrayOf(string)),
      arrayOf(
        shape({
          key: string.isRequired,
          title: string,
          subtitle: string,
          imageURL: string
        })
      )
    ]).isRequired
  }).isRequired,
  onChange: func.isRequired
};

export default AnswerEditor;
