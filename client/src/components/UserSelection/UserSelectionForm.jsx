/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const DeleteButton = () => {
  return (
    <button type="button" className="btn btn-sm btn-outline-danger">
      X
    </button>
  );
};

const UserSelectionForm = () => {
  const [newCriterionInput, setNewCriterionInput] = useState('');
  const [allCriteria, setAllCriteria] = useState([]);
  const [ruleSpecificCriteria, setRuleSpecificCriteria] = useState([]);
  const rules = [];

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="newCriterionInput">
            Criteria by which you want to select/reject FFQ participants
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="i.e. Lactose Intolerant"
              aria-label="i.e. Lactose Intolerant"
              value={newCriterionInput}
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setNewCriterionInput(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  if (newCriterionInput !== '') {
                    setAllCriteria((prevState) => [...prevState, newCriterionInput]);
                    setNewCriterionInput('');
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Select Criteria</label>
          <select
            multiple
            className="form-control"
            id="selectionCriteria"
            onChange={(e) => {
              setRuleSpecificCriteria((prevState) => {
                if (prevState.indexOf(e.target.value) === -1) {
                  console.log('Already in there');
                  return [...prevState, e.target.value];
                }
                return [...prevState];
              });
            }}
          >
            {allCriteria.map((option) => {
              return <option key={option}>{option}</option>;
            })}
          </select>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm align-self-center">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-outline-primary active">
                  <input type="radio" name="options" id="option1" autoComplete="off" checked /> And
                </label>
                <label className="btn btn-outline-primary">
                  <input type="radio" name="options" id="option2" autoComplete="off" /> Or
                </label>
              </div>
            </div>
            <div className="col-sm align-self-center">
              <ul className="list-group list-group-flush">
                {ruleSpecificCriteria.map((criteriaElement) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={criteriaElement}
                    >
                      {criteriaElement}

                      <DeleteButton />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-sm align-self-center">
              <select className="form-control" id="exampleFormControlSelect1">
                <option>Accept</option>
                <option>Reject</option>
                <option>Wait</option>
              </select>
            </div>
            <div className="col-sm align-self-center">
              <button type="submit" className="btn btn-primary">
                Add Rule
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSelectionForm;
