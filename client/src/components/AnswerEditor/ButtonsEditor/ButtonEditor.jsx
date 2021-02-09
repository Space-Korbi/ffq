import React, { useState } from 'react';
import { arrayOf, func, string, shape, number } from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';

import TextEditor from '../../TextEditor';
import { EditorCard } from '../../Cards';

const ButtonEditor = ({ dispatch, position, answerOption, index, modalTable }) => {
  const tabNames = ['Text', 'Action', 'Color'];

  const setPrevSelection = () => {
    let prevSelected = [];
    if (answerOption.skip && answerOption.skip.length) {
      prevSelected = modalTable.data
        .filter((data) => answerOption.skip.includes(data.question._id))
        .map((data) => {
          return { index: data.index, questionId: data.question._id };
        });
    }
    return prevSelected;
  };

  const [selectedQuestions, setSelectedQuestions] = useState(() => setPrevSelection());

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      setSelectedQuestions((prevSelection) => [
        ...prevSelection,
        { index: row.index, questionId: row.question._id }
      ]);
    } else {
      setSelectedQuestions((prevSelection) => {
        return prevSelection.filter((prev) => prev.questionId !== row.question._id);
      });
    }
  };

  const textTabContent = (
    <TextEditor
      placeholder="Button Title"
      value={answerOption.title}
      onChange={(value) => {
        dispatch({
          type: 'changeButtonTitle',
          payload: { id: answerOption.id, position, title: value }
        });
      }}
    />
  );

  const actionTabContent = (
    <div className="d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-outline-primary "
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        Select questions to skip
      </button>
    </div>
  );

  const handleColorChange = (color) => {
    dispatch({
      type: 'changeButtonColor',
      payload: { id: answerOption.id, position, color }
    });
  };

  const colors1 = ['primary', 'warning', 'success', 'danger'];
  const colors2 = ['secondary', 'info', 'light', 'dark'];

  const colorTabContent = (
    <div className="row flex-row no-gutters">
      <div className="col p-0 w-100 d-flex justify-content-between flex-nowrap">
        {colors1.map((color) => {
          return (
            <button
              key={color}
              type="button"
              className={`btn btn-${color} m-1`}
              style={{ minHeight: '30px' }}
              onClick={() => handleColorChange(color)}
            >
              {' '}
            </button>
          );
        })}
      </div>
      <div className="col p-0 w-100 d-flex justify-content-between flex-nowrap">
        {colors2.map((color) => {
          return (
            <button
              key={color}
              type="button"
              className={`btn btn-${color} m-1`}
              style={{ minHeight: '30px' }}
              onClick={() => handleColorChange(color)}
            >
              {' '}
            </button>
          );
        })}
      </div>
    </div>
  );

  const removeCard = () => {
    dispatch({
      type: 'removeButton',
      payload: { id: answerOption.id, position }
    });
  };

  function range(start, end) {
    const foo = [];
    for (let i = start; i <= end; i += 1) {
      foo.push(i);
    }
    return foo;
  }

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    hideSelectAll: true,
    selected: selectedQuestions.map((question) => question.index),
    nonSelectable: range(0, modalTable.index),
    hideSelectColumn: true,
    nonSelectableClasses: 'non-selectable-column',
    onSelect: handleOnSelect,
    bgColor: '#dc3545'
  };

  return (
    <div className="col my-3">
      <EditorCard
        index={index}
        tabNames={tabNames}
        tabContents={[textTabContent, actionTabContent, colorTabContent]}
        removeCard={removeCard}
      />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Questions to skip
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setSelectedQuestions([])}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <BootstrapTable
                keyField="index"
                data={modalTable.data}
                columns={modalTable.modalTableColumns}
                selectRow={selectRow}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setSelectedQuestions([])}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  dispatch({
                    type: 'setSkippedQuestions',
                    payload: {
                      id: answerOption.id,
                      position,
                      skip: selectedQuestions.map((question) => question.questionId)
                    }
                  });
                  setSelectedQuestions([]);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ButtonEditor.propTypes = {
  answerOption: shape({
    type: string,
    options: shape({
      left: arrayOf(shape({ id: string.isRequired, title: string })),
      right: arrayOf(shape({ id: string.isRequired, title: string }))
    })
  }).isRequired,
  dispatch: func.isRequired,
  position: string.isRequired,
  index: number.isRequired,
  modalTable: shape({ data: shape({}), modalTableColumns: shape({}), index: number }).isRequired
};

export default ButtonEditor;
