import React from 'react';
import Navigation from '../Navigation';

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
          <option selected>Choose...</option>
          <option value="1">Type 1 (Buttons)</option>
          <option value="2">Type 2 (Pictures) </option>
          <option value="3">Type 3 (User Input)</option>
        </select>
      </div>
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
          <div className="row">
            <div className="col mt-2" style={{ border: '1px solid red' }}>
              <QuestionTypeSelection />
            </div>
            <div className="col mt-2" style={{ border: '1px solid green' }} />
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
