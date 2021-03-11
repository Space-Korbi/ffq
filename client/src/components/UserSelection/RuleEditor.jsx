import React, { useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';

// localization
import { useTranslation } from 'react-i18next';

// services
import { questionnaireService } from '../../services';

// components
import AddRule from './AddRule';
import { CardsGrid } from '../Cards';
import { DeleteButton } from '../Button';
import Spinner from '../Spinner';
import { Info } from '../Popover';

const checkResult = (result) => {
  switch (result.toLowerCase()) {
    case 'accept':
      return 'badge badge-success';
    case 'reject':
      return 'badge badge-danger';
    case 'wait':
      return 'badge badge-warning';
    default:
      return 'badge badge-info';
  }
};

const RuleCard = ({ index, rule, removeRule }) => {
  const { t } = useTranslation(['globals']);

  const translateOperator = (operator) => {
    switch (operator.toLowerCase()) {
      case 'or':
        return t(('globals:or', 'Oder'));
      case 'and':
        return t(('globals:and', 'Und'));
      default:
        return '';
    }
  };
  const translateDecision = (decision) => {
    switch (decision.toLowerCase()) {
      case 'accept':
        return t(('globals:accept', 'Akzeptieren'));
      case 'reject':
        return t(('globals:reject', 'Ablehnen'));
      case 'wait':
        return t(('globals:wait', 'Warten'));
      default:
        return '';
    }
  };

  return (
    <div className="mb-3 mr-3">
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            {t(('globals:rule', 'Regel'))} {index + 1}
            <DeleteButton onClick={() => removeRule(rule)} />
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
              <span className="badge badge-info">{translateOperator(rule.operator)}</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <span className="mr-1">{t(('globals:decision', 'Entscheidung'))}</span>
          <span className={checkResult(rule.decision)}>{translateDecision(rule.decision)}</span>
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

const RuleEditor = ({
  selectionCriteria,
  screeningRules,
  saveRule,
  removeRule,
  questionnaireId
}) => {
  const { t } = useTranslation(['globals']);

  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [didChange, setDidChange] = useState(false);

  const RuleCards = screeningRules.map((rule, index) => {
    return (
      <RuleCard
        key={rule.id}
        index={index}
        rule={rule}
        removeRule={(r) => {
          setDidChange(true);
          setStatus('');
          removeRule(r);
        }}
      />
    );
  });

  return (
    <div>
      <div className="row no-gutters">
        <div className="col d-flex flex-wrap">
          <div className="m-0 mb-3 mb-sm-5">
            <button
              type="button"
              disabled={!didChange}
              className="btn btn-outline-primary mr-2"
              onClick={() => {
                questionnaireService
                  .updateQuestionnaire(questionnaireId, { screeningRules })
                  .then(() => {
                    setStatus(
                      <div className="alert alert alert-success">
                        {t(('globals:changes_save_success', 'Änderungen erfolgreich gespeichert.'))}
                      </div>
                    );
                    setSubmitting(false);
                    setDidChange(false);
                  })
                  .catch((error) => {
                    const errorList = (listElement) => (
                      <div className="alert alert-danger">
                        <ul className="list-unstyled content-align-center mb-0">{listElement}</ul>
                      </div>
                    );
                    const errorListElements = error.data.errors.map((err) => {
                      return <li key={err.value}>{err.msg}</li>;
                    });
                    setStatus(errorList(errorListElements));
                    setSubmitting(false);
                    setDidChange(false);
                  });
              }}
            >
              {submitting ? (
                <>
                  {t(('globals:saving', 'Speichern...'))}
                  <Spinner className="spinner-border spinner-border-sm ml-1" />
                </>
              ) : (
                t(('globals:save_changes', 'Änderungen speichern'))
              )}
            </button>
          </div>
          <div className="m-0 mb-3">{status}</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-5 mb-3">
          <AddRule
            selectionCriteria={selectionCriteria}
            saveRule={(rule) => {
              setDidChange(true);
              setStatus('');
              saveRule(rule);
            }}
          />
        </div>
        <div className="col">
          <h6 className="d-inline-flex mb-0">
            {t(('globals:rules', 'Regeln'))}
            <sup className="text-info ml-1">
              <Info
                text={t(
                  ('globals:rules_info',
                  'Die Entscheidung der ersten Regel, dessen Kriterien erfüllt werden, wird angewandt. Wenn keine Regel angewandt werden kann, wird der Teilnehmer akzeptiert.')
                )}
                size={20}
              />
            </sup>
          </h6>
          <CardsGrid Cards={RuleCards} gridColumns="2" />
        </div>
      </div>
    </div>
  );
};

RuleEditor.propTypes = {
  questionnaireId: string.isRequired,
  selectionCriteria: arrayOf(string).isRequired,
  screeningRules: arrayOf(
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
