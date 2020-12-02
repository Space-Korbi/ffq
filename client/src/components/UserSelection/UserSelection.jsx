/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { arrayOf, string, func } from 'prop-types';
import { Trash2, Info } from 'react-feather';
import AddSelectionCriteria from './AddSelectionCriteria';
import AddRule from './AddRule';
import RemovableListItem from '../List';
import SelectionRules from './SelectionRules';

import UserSelectionForm from './UserSelectionForm';

const Navigation = () => {
  return (
    <ul className="nav nav-tabs" id="userSelection" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="overview-tab"
          data-toggle="tab"
          href="#overview"
          role="tab"
          aria-controls="overview"
          aria-selected="true"
        >
          Criteria & Rules
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="addNew-tab"
          data-toggle="tab"
          href="#addNew"
          role="tab"
          aria-controls="addNew"
          aria-selected="false"
        >
          Add new
        </a>
      </li>
    </ul>
  );
};

const SelectionCriteriaList = ({ selectionCriteria, onClick }) => {
  return (
    <ul className="list-group mb-3" style={{ minWidth: '15rem' }}>
      {selectionCriteria.map((criteria) => {
        return (
          <RemovableListItem key={criteria} content={criteria} onClick={onClick} Icon={Trash2} />
        );
      })}
    </ul>
  );
};

SelectionCriteriaList.propTypes = {
  selectionCriteria: arrayOf(string).isRequired,
  onClick: func.isRequired
};

<<<<<<< HEAD
const mockSelectionCriteria = ['Laktose Intolerant', 'Vegan'];
=======
const mockSelectionCriteria = ['Laktose Intolerant', 'Overweight', 'Pregnant', 'Vegan'];
>>>>>>> d690b19d... Adjust spacing and text-break in RemovableListItem

const UserSelection = () => {
  const [selectionCriteria, setSelectionCriteria] = useState(mockSelectionCriteria);

  // api call to get rules
  // api call to get Saved criteria
  const mockRules = [];

  const addToSelectionCriteria = (newCriteria) => {
    // check if selectionCriteria is not empty and not just whitespace
    if (/\S/.test(newCriteria) && !selectionCriteria.includes(newCriteria)) {
      setSelectionCriteria((prevCrtieria) => [...prevCrtieria, newCriteria]);
    }
  };

  const removeFromSelectionCriteria = (criteriaToRemove) => {
    setSelectionCriteria(selectionCriteria.filter((criteria) => criteria !== criteriaToRemove));
  };

  const saveRule = (rule) => {
    // api call to save rules in db
    mockRules.push(rule);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col">
            <Navigation />
          </div>
        </div>
        <div className="tab-content" id="userSelectionContent">
          <div
            className="tab-pane fade show active"
            id="overview"
            role="tabpanel"
            aria-labelledby="overview-tab"
          >
            <div className="row">
              <div className="col-lg-4 mb-3">
                <h6>
                  <sup className="text-info mr-1">
                    <Info size={18} />
                  </sup>
                  Selection Criteria
                </h6>
                <SelectionCriteriaList
                  selectionCriteria={selectionCriteria}
                  onClick={removeFromSelectionCriteria}
                />
              </div>
              <div className="col mb-3">
                <h6 className>
                  <sup className="text-info mr-1">
                    <Info size={18} />
                  </sup>
                  Rules
                </h6>
                <SelectionRules />
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="addNew" role="tabpanel" aria-labelledby="addNew-tab">
            <div className="row">
              <div className="col-lg-4 mb-3">
                <AddSelectionCriteria onClick={addToSelectionCriteria}>
                  <SelectionCriteriaList
                    selectionCriteria={selectionCriteria}
                    onClick={removeFromSelectionCriteria}
                  />
                </AddSelectionCriteria>
              </div>
              <div className="col-lg mb-3">
                <AddRule selectionCriteria={selectionCriteria} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  <UserSelectionForm userSelectionCriteria={mockSelectionCriteria} saveRule={saveRule} /> */}
    </div>
  );
};

export default UserSelection;
