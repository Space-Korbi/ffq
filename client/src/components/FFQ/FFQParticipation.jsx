/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import Question from './Question';
import Navigation from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

function FFQParticipation() {
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [canNextQuestion, setCanNextQuestion] = useState(true);
  const [canPrevQuestion, setCanPrevQuestion] = useState(false);

  const questions = [
    <Question
      questionHeadline="Question 1"
      questionText="This is the 1. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 2"
      questionText="This is the 2. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 3"
      questionText="This is the 3. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 4"
      questionText="This is the 4. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 5"
      questionText="This is the 5. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 6"
      questionText="This is the 6. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 7"
      questionText="This is the 7. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 6"
      questionText="This is the 6. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 7"
      questionText="This is the 7. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 6"
      questionText="This is the 6. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionHeadline="Question 7"
      questionText="This is the 7. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />
  ];

  const numberOfQuestions = questions.length;

  const prevQuestionExists = () => {
    if (currentQuestionID <= 1) {
      setCanPrevQuestion(false);
    }
  };

  const nextQuestionExists = () => {
    if (currentQuestionID + 1 === numberOfQuestions) {
      setCanNextQuestion(false);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionID(currentQuestionID - 1);
    setCanNextQuestion(true);
    prevQuestionExists();
  };

  const nextQuestion = () => {
    setCurrentQuestionID(currentQuestionID + 1);
    setCanPrevQuestion(true);
    nextQuestionExists();
  };

  return (
    <div className="mx-5 my-5">
      {currentQuestionID === questions.length ? (
        <Submit />
      ) : (
        <div>{questions[currentQuestionID]}</div>
      )}
      <ProgressIndicator
        currentQuestionID={currentQuestionID}
        numberOfQuestions={numberOfQuestions}
      />

      <Navigation
        currentQuestionID={currentQuestionID}
        totalQuestions={questions.length}
        prevQuestion={() => {
          prevQuestion();
        }}
        nextQuestion={() => {
          nextQuestion();
        }}
        canPrevQuestion={canPrevQuestion}
        canNextQuestion={canNextQuestion}
      />
    </div>
  );
}

export default FFQParticipation;
