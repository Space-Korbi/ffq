import React, { useState } from 'react';
import Question from './Question';
import NavigationButton from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';

const images = { small: 'pizzaQuarter', medium: 'pizzaHalf', large: 'pizzaWhole' };

const questionData = [
  {
    id: 0,
    title: 'Q1',
    text: 'T1',
    category: 'C1',
    subcategory: 'S1',
    answered: false,
    answers: {
      frequency: { x1: false, x2: false, x3: false },
      amount: { small: false, medium: false, large: false }
    },
    images
  },
  {
    id: 1,
    title: 'Q2',
    text: 'T2',
    category: 'C2',
    subcategory: 'S2',
    answered: false,
    answers: {
      frequency: { x1: false, x2: false, x3: false },
      amount: { small: false, medium: false, large: false }
    },
    images
  },
  {
    id: 2,
    title: 'Q3',
    text: 'T3',
    category: 'C3',
    subcategory: 'S3',
    answered: false,
    answers: {
      frequency: { x1: false, x2: false, x3: false },
      amount: { small: false, medium: false, large: false }
    },
    images
  }
];

const submitData = { id: questionData.length + 1, userName: 'Gerhard' };

function Questionnaire() {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [canGoToNext, setCanGoToNext] = useState(true);
  const [canGoToPrevious, setCanGoToPrevious] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isLastElement, setIsLastElement] = useState(false);
  const [answered, setAnswered] = useState(false);
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

  const getAnswers = (ffqElementIndex) => {
    if (isValidQuestionIndex(ffqElementIndex)) {
      return questionData[ffqElementIndex].answers;
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

    let frequencyAnswered = false;
    let targetElementAnswered = false;

    if (isValidQuestionIndex(currentElementIndex)) {
      frequencyAnswered = Object.values(getAnswers(currentElementIndex).frequency).includes(true);
    }
    if (isValidQuestionIndex(ffqElementIndex)) {
      targetElementAnswered = Object.values(getAnswers(ffqElementIndex).frequency).includes(true);
      setAnswered(questionData[ffqElementIndex].answered);
    }

    if (frequencyAnswered && !targetElementAnswered) {
      setCollapsed(true);
      setCurrentElementIndex(ffqElementIndex);
    } else if (!frequencyAnswered && targetElementAnswered) {
      setCollapsed(false);
      setCurrentElementIndex(ffqElementIndex);
    } else {
      setCurrentElementIndex(ffqElementIndex);
    }
  };

  const saveFrequency = (values, questionId) => {
    questionData[questionId].answers.frequency = values;
  };

  const saveAmount = (values, questionId) => {
    questionData[questionId].answers.amount = values;
  };

  const handleChange = (values, type, questionId) => {
    switch (type) {
      case 'frequency':
        saveFrequency(values, questionId);
        if (Object.values(getAnswers(questionId).frequency).includes(true)) {
          setCollapsed(false);
        }
        break;
      case 'amount':
        saveAmount(values, questionId);
        questionData[questionId].answered = true;
        break;
      default:
        break;
    }
  };

  const markAsAnswered = () => {
    questionData[currentElementIndex].answered = true;
    setAnswered(true);
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
          images={images}
          handleChange={handleChange}
          collapsed={collapsed}
          getAnswers={getAnswers}
          markAsAnswered={markAsAnswered}
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
            disabled={!canGoToNext || !answered}
            move={() => transitionTo(currentElementIndex + 1)}
            icon="→"
          />
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
