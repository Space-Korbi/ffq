/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const UserSelectionForm = () => {
  const [criterion, setCriterion] = useState('');
  const [allSelectionCriteria, setAllSelectionCriteria] = useState([]);
  const selectors = [];
  const operators = { and: '&&', or: '||' };
  const decisions = { accept: 'Accept', reject: 'Reject', wait: 'Wait' };
  const rules = [];

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="criterion">
            Criteria by which you want to select/reject FFQ participants
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="i.e. Lactose Intolerant"
              aria-label="i.e. Lactose Intolerant"
              value={criterion}
              aria-describedby="basic-addon2"
              onChange={(e) => {
                setCriterion(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  if (criterion !== '') {
                    setAllSelectionCriteria((prevState) => [...prevState, criterion]);
                    setCriterion('');
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
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
                {allSelectionCriteria.map((criteriaElement) => {
                  return (
                    <li className="list-group-item" key={criteriaElement}>
                      {criteriaElement}
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
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
          <select multiple className="form-control" id="exampleFormControlSelect2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" />
        </div>
      </form>
    </div>
  );
};

export default UserSelectionForm;
