/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';

import AnswerButtons from './AnswerButtons';
import AmountCardsEditor from './AmountCardsEditor';
import { AnswerType, appendState } from '../../helpers';

const AnswerEditor = ({
  answerType,
  frequencyAnswers,
  amountAnswers,
  userInputAnswers,
  onChangeFrequencyAnswers,
  onChangeAmountAnswers,
  onChangeUserInputAnswers
}) => {
  return (
    <div>
      {answerType === AnswerType.Frequency && (
        <AnswerButtons frequencyAnswers={frequencyAnswers} onChange={onChangeFrequencyAnswers} />
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
  answerType: string.isRequired,
  frequencyAnswers: arrayOf(arrayOf(string)).isRequired,
  amountAnswers: arrayOf(string).isRequired,
  userInputAnswers: arrayOf(string).isRequired,
  onChangeFrequencyAnswers: func.isRequired,
  onChangeAmountAnswers: func.isRequired,
  onChangeUserInputAnswers: func.isRequired
};

export default AnswerEditor;
