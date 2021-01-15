import React from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';

// icons
import { InfoIcon } from '@primer/octicons-react';

// components
import AddRule from './AddRule';
import { CardsGrid } from '../Cards';
import { DeleteButton } from '../Button';

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
            Rule {index + 1} <DeleteButton onClick={() => removeRule(rule)} />
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

const RuleEditor = ({ selectionCriteria, rules, saveRule, removeRule }) => {
  const RuleCards = rules.map((rule, index) => {
    return <RuleCard key={rule.id} index={index} rule={rule} removeRule={removeRule} />;
  });

  return (
    <div className="row">
      <div className="col-md-6 col-lg-5 mb-3">
        <AddRule selectionCriteria={selectionCriteria} saveRule={saveRule} />
      </div>
      <div className="col">
        <h6>
          Rules
          <sup className="text-info ml-1">
            <InfoIcon />
          </sup>
        </h6>
        <CardsGrid Cards={RuleCards} gridColumns="2" />
      </div>
    </div>
  );
};

RuleEditor.propTypes = {
  selectionCriteria: arrayOf(string).isRequired,
  rules: arrayOf(
    shape({
      id: string.isRequired,
      criteria: arrayOf(string).isRequired,
      operator: string,
      decision: string.isRequired
    })
  ).isRequired,
  saveRule: func.isRequired,
  removeRule: func.isRequired
};

export default RuleEditor;
