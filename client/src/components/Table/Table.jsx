/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';

const NormalCell = ({
  value: initialValue,
  row,
  checkMyData // This is a custom function that we supplied to our table instance
}) => {
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    checkMyData(row);
  };
  // eslint-disable-next-line react/button-has-type
  return <button onClick={onBlur}>{initialValue}</button>;
};

function StandardTable({ columns, data, checkMyData }) {
  // Set our editable cell renderer as the default Cell renderer
  const defaultColumn = {
    Cell: NormalCell
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    defaultColumn,
    checkMyData
  });

  return (
    <div>
      <div className="overflow-auto">
        <BTable striped bordered hover size="sm" {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell) => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </BTable>
      </div>
    </div>
  );
}

export default StandardTable;
