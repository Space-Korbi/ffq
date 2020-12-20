import React, { useState } from 'react';
import { InfoIcon } from '@primer/octicons-react';
import SelectionCriteria from './SelectionCriteria';
import AddRule from './AddRule';
import SelectionRules from './SelectionRules';
import { NavTabs } from '../Navigation';
import { addValidString } from '../../helpers';

const rule1 = {
  id: '1',
  criteria: ['Laktose Intolerant', 'Vegan'],
  operator: 'And',
  decision: 'Accept'
};

const rule2 = {
  id: '2',
  criteria: ['Taking Medication'],
  operator: '',
  decision: 'Wait'
};

const mockSelectionCriteria = ['Laktose Intolerant', 'Taking Medication', 'Pregnant', 'Vegan'];
const mockRules = [rule1, rule2];

const UserSelection = () => {
  const [selectionCriteria, setSelectionCriteria] = useState(mockSelectionCriteria);
  const [selectionRules, setSelectionRules] = useState(mockRules);

  /**
   * TODO
   * api call to get rules && api call to get Saved criteria
   */

  const saveSelectionCriteria = (newCriteria) => {
    addValidString(newCriteria, selectionCriteria, setSelectionCriteria);
  };

  const removeFromSelectionCriteria = (criteriaToRemove) => {
    setSelectionCriteria(selectionCriteria.filter((criteria) => criteria !== criteriaToRemove));
  };

  const saveRule = (newRule) => {
    /**
     * TODO
     * api call to save rules in db
     */

    if (!selectionRules.includes(newRule)) {
      setSelectionRules((prevRules) => [...prevRules, newRule]);
    }
  };

  const removeRule = (ruleToRemove) => {
    if (ruleToRemove !== undefined) {
      setSelectionRules(
        selectionRules.filter((rule) => {
          return rule !== ruleToRemove;
        })
      );
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row mb-3 mt-4">
          <div className="col">
            <NavTabs tabs={['Criteria', 'Rules']} />
          </div>
        </div>
        <div className="tab-content" id="userSelectionContent">
          <div
            className="tab-pane fade show active"
            id="Criteria"
            role="tabpanel"
            aria-labelledby="Criteria-tab"
          >
            <div className="row">
              <div className="col-sm-7 mb-3">
                <h6>
                  <sup className="text-info mr-1">
                    <InfoIcon />
                  </sup>
                  Selection Criteria
                </h6>
                <SelectionCriteria
                  selectionCriteria={selectionCriteria}
                  addSelectionCriteria={saveSelectionCriteria}
                  removeSelectionCriteria={removeFromSelectionCriteria}
                />
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="Rules" role="tabpanel" aria-labelledby="Rules-tab">
            <div className="row">
              <div className="col mb-3">
                <h6>
                  <sup className="text-info mr-1">
                    <InfoIcon />
                  </sup>
                  Rules
                </h6>
                <AddRule selectionCriteria={selectionCriteria} saveRule={saveRule} />
              </div>
              <div className="col mb-3">
                <SelectionRules rules={selectionRules} removeRule={removeRule} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
