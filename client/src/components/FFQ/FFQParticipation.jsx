/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Question from './Question';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

class FFQParticipation extends Component {
  render() {
    return (
      <div>
        <h2>FFQ</h2>
        <div>
          <Question
            questionHeadline="Question 1"
            questionText="This is the first FFQ question"
            imageLarge={pizzaWhole}
            imageMedium={pizzaHalf}
            imageSmall={pizzaQuarter}
          />
        </div>
      </div>
    );
  }
}

export default FFQParticipation;
