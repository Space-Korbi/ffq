/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { useTable, usePagination } from 'react-table';
import BTable from 'react-bootstrap/Table';

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

function EditableTable({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData
    },
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <BTable striped bordered hover size="sm" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </BTable>
      <div>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group mr-2" role="group">
            <button
              className="btn btn-outline-primary"
              onClick={() => gotoPage(0)}
              disabled={canNextPage}
            >
              {'<<'}
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => previousPage()}
              disabled={canNextPage}
            >
              {'<'}
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => nextPage()}
              disabled={canPreviousPage}
            >
              {'>'}
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={canPreviousPage}
            >
              {'>>'}
            </button>
          </div>
          <div className="btn-group mr-2" role="group">
            <select
              className="btn btn-outline-primary dropdown-toggle"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        <span className="badge badge-info">
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
      </div>
    </>
  );
}

export default EditableTable;
