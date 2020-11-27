/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Question from './Question';
import NavigationButton from './Navigation';
import ProgressIndicator from './ProgressIndicator';
import Submit from './Submit';
import pizzaWhole from '../../images/pizza-whole-example.jpg';
import pizzaHalf from '../../images/pizza-half-example.jpg';
import pizzaQuarter from '../../images/pizza-quarter-example.jpg';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const pictures = { small: pizzaQuarter, medium: pizzaHalf, large: pizzaWhole };

const questionData = [
  {
    id: 1,
    title: 'Q1',
    text: 'T1',
    category: 'C1',
    subcategory: 'S1',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  },
  {
    id: 2,
    title: 'Q2',
    text: 'T2',
    category: 'C2',
    subcategory: 'S2',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  },
  {
    id: 3,
    title: 'Q3',
    text: 'T3',
    category: 'C3',
    subcategory: 'S3',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  },
  {
    id: 4,
    title: 'Q4',
    text: 'T4',
    category: 'C4',
    subcategory: 'S4',
    answered: false,
    answers: { frequency: null, amount: null },
    images: pictures
  }
];

const submitData = { id: questionData.length + 1, userName: 'Gerhard' };

function Questionnaire() {
  const [currentElementId, setCurrentElementId] = useState(0);
  const [canGoToNext, setCanGoToNext] = useState(true);
  const [canGoToPrevious, setCanGoToPrevious] = useState(false);
  const [collapsed, setCollapsed] = useState('collapse');
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const numberOfQuestions = questionData.length;

  const ffqElements = questionData.concat(submitData);

  const hasPredecessor = (ffqElementId) => {
    if (ffqElementId <= 0) {
      return false;
    }
    return true;
  };

  const hasSuccessor = (ffqElementId) => {
    if (ffqElementId >= ffqElements.length - 1) {
      return false;
    }
    return true;
  };

  const isValidQuestionId = (questionId) => {
    if (questionId >= 0 && questionId < questionData.length) {
      return true;
    }
    return false;
  };

  const isValidFFQElement = (ffqElementId) => {
    if (ffqElementId >= 0 && ffqElementId < ffqElements.length) {
      return true;
    }
    return false;
  };

  function setNavigationOptions(ffqElementId) {
    if (ffqElementId < currentElementId) {
      setCanGoToNext(true);
      if (!hasPredecessor(ffqElementId)) {
        setCanGoToPrevious(false);
      }
    }
    if (ffqElementId > currentElementId) {
      setCanGoToPrevious(true);
      if (!hasSuccessor(ffqElementId)) {
        setCanGoToNext(false);
      }
    }
  }

  const transitionTo = (ffqElementId) => {
    if (!isValidFFQElement) {
      return;
    }
    setNavigationOptions(ffqElementId);

    if (isValidQuestionId(ffqElementId)) {
      console.log('QuestionID', ffqElementId);
      if (questionData[ffqElementId].answered) {
        setQuestionAnswered(true);
      }
      if (!questionData[ffqElementId].answered) {
        setQuestionAnswered(false);
        // deselect all
        $('#collapseExample').collapse('hide');
        $('#collapseExample').on('hidden.bs.collapse', () => {
          console.log('now its collpased');
        });
      }
    }
    setCurrentElementId(ffqElementId);
  };

  const saveFrequency = (answer) => {
    if (isValidQuestionId(currentElementId)) {
      questionData[currentElementId].answers.frequency = answer;
    }
  };

  const saveAmount = (answer) => {
    if (isValidQuestionId(currentElementId)) {
      questionData[currentElementId].answers.amount = answer;
    }
  };

  const handleClick = (e) => {
    if (e.target.name === 'frequency') {
      saveFrequency(e.target.id);
      $('#collapseExample').collapse('show');
      questionData[currentElementId].answered = true;
      setQuestionAnswered('true');
      console.log(questionData[currentElementId]);
    }
    if (e.target.name === 'amount') {
      console.log(e.target.id, 'saved to amount');
      saveAmount(e.target.id);
      questionData[currentElementId].answered = true;
    }
  };

  const questionIsAnswered = (questionId) => {
    return questionData[questionId].answered;
  };

  const getLabels = (ffqElementId) => {
    return {
      title: questionData[ffqElementId].title,
      text: questionData[ffqElementId].text,
      category: questionData[ffqElementId].category,
      subcategory: questionData[ffqElementId].subcategory
    };
  };

  return (
    <div className="mx-5 my-5">
      {hasSuccessor(currentElementId) ? (
        <div>
          <Question
            id={currentElementId}
            labels={getLabels(currentElementId)}
            images={pictures}
            handleClick={handleClick}
            collapsed={collapsed}
          />
        </div>
      ) : (
        <Submit />
      )}
      <ProgressIndicator currentPosition={currentElementId} length={numberOfQuestions} />
      <div className="mt-2">
        <div className="btn-group" role="group">
          <NavigationButton
            disabled={!canGoToPrevious}
            move={() => transitionTo(currentElementId - 1)}
            icon="←"
          />
          <NavigationButton
            disabled={!canGoToNext || !questionAnswered}
            move={() => transitionTo(currentElementId + 1)}
            icon="→"
          />
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
