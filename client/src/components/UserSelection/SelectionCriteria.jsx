import React, { useState } from 'react';
import { func, string, arrayOf } from 'prop-types';
import { PlusIcon } from '@primer/octicons-react';
import RemovableListItem from '../List';

const SelectionCriteriaInput = ({ onClick }) => {
  const [newCriteriaInput, setNewCriteriaInput] = useState('');

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name="newCriteria"
        id="newCriteria"
        className="form-control"
        value={newCriteriaInput}
        placeholder="i.e. Lactose Intolerant"
        onChange={(e) => setNewCriteriaInput(e.target.value)}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary d-flex align-items-center"
          type="button"
          onClick={() => {
            onClick(newCriteriaInput);
            setNewCriteriaInput('');
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

SelectionCriteriaInput.propTypes = {
  onClick: func.isRequired
};

const SelectionCriteriaList = ({ selectionCriteria, onClick }) => {
  return (
    <ul className="list-group mb-3" style={{ minWidth: '15rem' }}>
      {selectionCriteria.map((criteria) => {
        return <RemovableListItem key={criteria} content={criteria} onClick={onClick} isTrashCan />;
      })}
    </ul>
  );
};

SelectionCriteriaList.propTypes = {
  selectionCriteria: arrayOf(string).isRequired,
  onClick: func.isRequired
};

const SelectionCriteria = ({
  selectionCriteria,
  addSelectionCriteria,
  removeSelectionCriteria
}) => {
  return (
    <>
      <SelectionCriteriaInput onClick={addSelectionCriteria} />
      <SelectionCriteriaList
        selectionCriteria={selectionCriteria}
        onClick={removeSelectionCriteria}
      />
    </>
  );
};

SelectionCriteria.propTypes = {
  selectionCriteria: arrayOf(string).isRequired,
  addSelectionCriteria: func.isRequired,
  removeSelectionCriteria: func.isRequired
};

export default SelectionCriteria;
