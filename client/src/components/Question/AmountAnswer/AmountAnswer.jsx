/* eslint-disable no-unused-vars */
import React from 'react';
import { arrayOf, string, shape } from 'prop-types';

import AnswerCardsDeck from './AnswerCardsDeck';

import pizzaWhole from '../../../images/pizza-whole-example.jpg';

const saveAnswer = () => {
  console.log('answer');
};

const mockAnswers = [
  { key: '1', title: 'Eins', subtitle: 'Sub 1', imageURL: '' },
  { key: '2', title: 'Zwei', subtitle: 'Sub 2', imageURL: pizzaWhole },
  { key: '3', title: 'Drei', subtitle: 'Sub 3' }
];

const AmountAnswer = ({ answers }) => {
  return (
    <div>
      <div className="container-fluid px-0">
        <div className="row no-gutters overflow-auto flex-row flex-nowrap text-center my-3">
          <AnswerCardsDeck answers={mockAnswers} saveAnswer={saveAnswer} />
        </div>
      </div>
    </div>
  );
};

AmountAnswer.propTypes = {
  answers: arrayOf(
    shape({
      key: string.isRequired,
      title: string.isRequired,
      subtitle: string,
      imageURL: string
    })
  ).isRequired
};

export default AmountAnswer;
