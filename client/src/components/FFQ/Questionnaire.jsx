import React, { useState } from 'react';
import Question from './Question';
import Navigation from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

function FFQPresentation() {
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [canNextQuestion, setCanNextQuestion] = useState(true);
  const [canPrevQuestion, setCanPrevQuestion] = useState(false);

  const questions = [
    <Question
      questionTitle="question-1"
      questionText="This is the 1. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionTitle="question-2"
      questionText="This is the 2. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionTitle="question-3"
      questionText="This is the 3. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionTitle="question-4"
      questionText="This is the 4. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionTitle="question-5"
      questionText="This is the 5. FFQ question"
      imageLarge={pizzaWhole}
      imageMedium={pizzaHalf}
      imageSmall={pizzaQuarter}
    />,
    <Question
      questionTitle="question-6"
      questionText="This is the 6. FFQ question"
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
      <ProgressIndicator currentPosition={currentQuestionID} length={numberOfQuestions} />

      <Navigation
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

export default FFQPresentation;
