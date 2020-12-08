import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import DeleteButton from '../Button';

const checkResult = (result) => {
  switch (result) {
    case 'Accept':
      return 'badge badge-success';
    case 'Reject':
      return 'badge badge-danger';
    case 'Wait':
      return 'badge badge-warning';
    default:
      return 'badge badge-info';
  }
};

const RuleCard = ({ index, rule, removeRule }) => {
  return (
    <div className="mb-3 mr-3">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            Rule {index + 1} <DeleteButton element={rule} onClick={removeRule} />
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              <ul className="list-group">
                {rule.criteria.map((criterion) => {
                  return (
                    <li key={criterion} className="list-group-item">
                      {criterion}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-3 align-self-center d-flex justify-content-start">
              <span className="badge badge-info">{rule.operator}</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <span>Decision: </span>
          <span className={checkResult(rule.decision)}>{rule.decision}</span>
        </div>
      </div>
    </div>
  );
};

RuleCard.propTypes = {
  index: number.isRequired,
  rule: shape({
    id: string.isRequired,
    criteria: arrayOf(string).isRequired,
    operator: string,
    decision: string
  }).isRequired,
  removeRule: func.isRequired
};

const SelectionRules = ({ rules, removeRule }) => {
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {rules.map((rule, index) => {
        return (
          <div key={rule.id}>
            <RuleCard index={index} rule={rule} removeRule={removeRule} />
          </div>
        );
      })}
    </div>
  );
};

SelectionRules.propTypes = {
  rules: arrayOf(
    shape({
      id: string.isRequired,
      criteria: arrayOf(string).isRequired,
      operator: string,
      decision: string.isRequired
    })
  ).isRequired,
  removeRule: func.isRequired
};

export default SelectionRules;
