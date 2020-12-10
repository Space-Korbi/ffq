/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { arrayOf, func, string, oneOfType, shape } from 'prop-types';

import AnswerButtons from './AnswerButtons';
import AmountCardsEditor from './AmountCardsEditor';
import { AnswerType, appendState } from '../../helpers';

const AnswerEditor = ({
  answers,
  onChangeFrequencyAnswers,
  onChangeAmountAnswers,
  onChangeUserInputAnswers
}) => {
  return (
    <div>
      {answers.type === AnswerType.Frequency && (
        <AnswerButtons frequencyAnswers={answers.options} onChange={onChangeFrequencyAnswers} />
      )}
      {/* {answerType === AnswerType.Amount && (
        <AmountCardsEditor
          amountCards={amountCards}
          onChange={setAmountCards}
          addAmountCard={(element) => appendState(element, amountCards, setAmountCards)}
        />
      )} */}
    </div>
  );
};

AnswerEditor.propTypes = {
  answers: shape({
    type: string.isRequired,
    options: oneOfType([arrayOf(arrayOf(string)), arrayOf(string)]).isRequired
  }).isRequired,
  onChangeFrequencyAnswers: func.isRequired,
  onChangeAmountAnswers: func.isRequired,
  onChangeUserInputAnswers: func.isRequired
};

export default AnswerEditor;
