/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { PlusIcon } from '@primer/octicons-react';
import Navigation from '../Navigation';
import Question from '../Question';
import AnswerButtons from './AnswerButtons';

const tabs = ['Creation', 'Order'];

const QuestionTypeSelection = () => {
  return (
    <div>
      <div className="input-group my-2">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="inputGroupSelect01">
            Question Type
          </label>
        </div>
        <select className="custom-select" id="inputGroupSelect01">
          <option defaultValue>Choose...</option>
          <option value="1">Type 1 (Buttons)</option>
          <option value="2">Type 2 (Pictures) </option>
          <option value="3">Type 3 (User Input)</option>
        </select>
      </div>
    </div>
  );
};

const QuestionTitelInput = () => {
  return (
    <div className="input-group my-2">
      <div className="input-group-prepend">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Titel
        </span>
      </div>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

const QuestionCreation = () => {
  return (
    <div className="m-4">
      <Navigation tabs={tabs} />
      <div className="tab-content" id="questionCreationContent">
        <div
          className="tab-pane fade show active"
          id={tabs[0]}
          role="tabpanel"
          aria-labelledby={`${tabs[0]}-tab`}
        >
          <div className="row no-gutters">
            <div className="col-md-5 col-lg-6 m-2 ">
              <div className="form-inline" id="inputs">
                <div className="col px-1">
                  <QuestionTypeSelection />
                </div>
                <div className="col px-1">
                  <QuestionTitelInput />
                </div>
                <div className="w-100" />
                <div className="col px-1">
                  <QuestionTitelInput />
                </div>
                <div className="col px-1">
                  <QuestionTitelInput />
                </div>
              </div>
              <AnswerButtons />
            </div>
            <div className="col mt-2 border border-info">
              <Question />
            </div>
          </div>
        </div>
        <div
          className="tab-pane fade show "
          id={tabs[1]}
          role="tabpanel"
          aria-labelledby={`${tabs[1]}-tab`}
        >
          <div className="row">
            <div className="col">Hello World Order is Born</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreation;
