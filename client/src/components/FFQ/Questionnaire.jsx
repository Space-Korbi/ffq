import React, { useState } from 'react';
import Question from './Question';
import NavigationButton from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';

const pictures = { small: pizzaQuarter, medium: pizzaHalf, large: pizzaWhole };

const questionData = [
  {
    id: 0,
    title: 'Q1',
    text: 'T1',
    category: 'C1',
    subcategory: 'S1',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  },
  {
    id: 1,
    title: 'Q2',
    text: 'T2',
    category: 'C2',
    subcategory: 'S2',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  },
  {
    id: 2,
    title: 'Q3',
    text: 'T3',
    category: 'C3',
    subcategory: 'S3',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  }
];

const submitData = { id: questionData.length + 1, userName: 'Gerhard' };

function Questionnaire() {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [canGoToNext, setCanGoToNext] = useState(true);
  const [canGoToPrevious, setCanGoToPrevious] = useState(false);
  const [collapsed, setCollapsed] = useState('collapse');
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [isLastElement, setIsLastElement] = useState(false);
  const numberOfQuestions = questionData.length;

  const ffqElements = questionData.concat(submitData);

  const hasPredecessor = (ffqElementIndex) => {
    if (ffqElementIndex <= 0) {
      return false;
    }
    return true;
  };

  const hasSuccessor = (ffqElementIndex) => {
    if (ffqElementIndex >= ffqElements.length - 1) {
      return false;
    }
    return true;
  };

  const isValidQuestionIndex = (ffqElementIndex) => {
    if (ffqElementIndex >= 0 && ffqElementIndex < questionData.length) {
      return true;
    }
    return false;
  };

  const isValidFFQElement = (ffqElementIndex) => {
    if (ffqElementIndex >= 0 && ffqElementIndex < ffqElements.length) {
      return true;
    }
    return false;
  };

  function setNavigationOptions(ffqElementIndex) {
    if (ffqElementIndex < currentElementIndex) {
      setCanGoToNext(true);
      if (!hasPredecessor(ffqElementIndex)) {
        setCanGoToPrevious(false);
      }
    }
    if (ffqElementIndex > currentElementIndex) {
      setCanGoToPrevious(true);
      if (!hasSuccessor(ffqElementIndex)) {
        setCanGoToNext(false);
      }
    }
  }

  const getFrequencyAnswer = (ffqElementIndex) => {
    if (isValidQuestionIndex(ffqElementIndex)) {
      return questionData[ffqElementIndex].answers.frequency;
    }
    return null;
  };

  const checkForLastElement = (ffqElementIndex) => {
    if (ffqElementIndex === ffqElements.length - 1) {
      setIsLastElement(true);
    } else {
      setIsLastElement(false);
    }
  };

  const transitionTo = (ffqElementIndex) => {
    if (!isValidFFQElement(ffqElementIndex)) {
      return;
    }
    checkForLastElement(ffqElementIndex);
    setNavigationOptions(ffqElementIndex);

    const currentElementIsCollapsed = getFrequencyAnswer(currentElementIndex) === null;
    const targetIsCollapsed = getFrequencyAnswer(ffqElementIndex) === null;

    if (!currentElementIsCollapsed && targetIsCollapsed) {
      setCollapsed('collapse');
      setCurrentElementIndex(ffqElementIndex);
    } else if (currentElementIsCollapsed && !targetIsCollapsed) {
      setCurrentElementIndex(ffqElementIndex);
      setCollapsed('collapse.show');
    } else {
      setCurrentElementIndex(ffqElementIndex);
    }
  };

  const saveFrequency = (answer, questionId) => {
    questionData[questionId].answers.frequency = answer;
  };

  const saveAmount = (answer, questionId) => {
    questionData[questionId].answers.amount = answer;
  };

  const saveAnswers = (e, questionId) => {
    if (e.target.name === 'frequency') {
      saveFrequency(e.target.value, questionId);
      // ! Delete below, only for testing
      questionData[questionId].answered = true;
      setQuestionAnswered('true');
    }
    if (e.target.name === 'amount') {
      saveAmount(e.target.value, questionId);
      questionData[questionId].answered = true;
    }
  };

  const handleClick = (e, questionId) => {
    saveAnswers(e, questionId);
    setCollapsed('collapse.show');
  };

  const getLabels = (ffqElementIndex) => {
    return {
      title: questionData[ffqElementIndex].title,
      text: questionData[ffqElementIndex].text,
      category: questionData[ffqElementIndex].category,
      subcategory: questionData[ffqElementIndex].subcategory
    };
  };

  return (
    <div className="mx-5 my-5">
      {isLastElement && !isValidQuestionIndex(currentElementIndex) ? (
        <div>
          <Submit />
        </div>
      ) : (
        <Question
          key={currentElementIndex}
          id={currentElementIndex}
          labels={getLabels(currentElementIndex)}
          images={pictures}
          handleClick={handleClick}
          collapsed={collapsed}
          getAnswers={getFrequencyAnswer}
        />
      )}
      <ProgressIndicator currentPosition={currentElementIndex} length={numberOfQuestions} />
      <div className="mt-2">
        <div className="btn-group" role="group">
          <NavigationButton
            disabled={!canGoToPrevious}
            move={() => transitionTo(currentElementIndex - 1)}
            icon="←"
          />
          <NavigationButton
            disabled={!canGoToNext || !questionAnswered}
            move={() => transitionTo(currentElementIndex + 1)}
            icon="→"
          />
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
