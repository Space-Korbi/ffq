/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { arrayOf, func, string } from 'prop-types';
import { Plus } from 'react-feather';

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
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

SelectionCriteriaInput.propTypes = {
  onClick: func.isRequired
};

const AddSelectionCriteria = ({ children, onClick }) => {
  return (
    <>
      <h6>Add selection criteria</h6>
      <SelectionCriteriaInput onClick={onClick} />
      {children}
    </>
  );
};

AddSelectionCriteria.propTypes = {
  children: func.isRequired,
  onClick: func.isRequired
};

export default AddSelectionCriteria;
