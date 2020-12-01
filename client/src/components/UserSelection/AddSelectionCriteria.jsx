import React from 'react';
import { arrayOf, string, func } from 'prop-types';
import { X, Plus } from 'react-feather';

const SelectionCriteriaInput = () => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name="newCriteria"
        id="newCriteria"
        className="form-control"
        placeholder="i.e. Lactose Intolerant"
        onChange={(e) => {
          console.log(e);
        }}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary d-flex align-items-center"
          type="button"
          onClick={() => {
            console.log('click +');
          }}
        >
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
};

const DeleteButton = ({ onClick, element }) => {
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-danger d-flex align-items-center p-1"
      onClick={() => onClick(element)}
    >
      <X size={16} />
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: func.isRequired,
  element: string.isRequired
};

const RemovableListItem = ({ content }) => {
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      {content} <DeleteButton />
    </li>
  );
};

RemovableListItem.propTypes = {
  content: string.isRequired
};

const SelectionCriteriaList = ({ selectionCriteria }) => {
  return (
    <ul className="list-group mb-3">
      {selectionCriteria.map((criteria) => {
        return <RemovableListItem content={criteria} />;
      })}
    </ul>
  );
};

SelectionCriteriaList.propTypes = {
  selectionCriteria: arrayOf(string).isRequired
};

const AddSelectionCriteria = ({ selectionCriteria }) => {
  return (
    <>
      <h6>Add Selection Criteria</h6>
      <SelectionCriteriaInput />
      <SelectionCriteriaList selectionCriteria={selectionCriteria} />
    </>
  );
};

AddSelectionCriteria.propTypes = {
  selectionCriteria: arrayOf(string).isRequired
};

export default AddSelectionCriteria;
