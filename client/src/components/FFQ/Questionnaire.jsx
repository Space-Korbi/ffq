import React, { useState } from 'react';
import Question from './Question';
import NavigationButton from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

function Questionnaire() {
  const [currentQuestionID, setCurrentQuestionID] = useState(0);
  const [canNextQuestion, setCanNextQuestion] = useState(true);
  const [canPrevQuestion, setCanPrevQuestion] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const questionData = [
    { id: 1, title: 'Q1', text: 'T1' },
    { id: 2, title: 'Q2', text: 'T2' },
    { id: 3, title: 'Q3', text: 'T3' },
    { id: 4, title: 'Q4', text: 'T4' }
  ];

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

      <div className="mt-2">
        <div className="btn-group" role="group">
          <NavigationButton disabled={!canPrevQuestion} move={prevQuestion} icon="←" />
          <NavigationButton disabled={!canNextQuestion} move={nextQuestion} icon="→" />
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
