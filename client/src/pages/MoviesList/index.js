/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable, useRowSelect } from 'react-table';
import BTable from 'react-bootstrap/Table';
import { getAllMovies } from '../../api';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const MoviesList = () => {
  // Declare a new state variable, which we'll call "movie"
  // eslint-disable-next-line no-unused-vars
  const [movieList, setMovieList] = useState([]);

  useEffect(async () => {
    /**
     * * Infinite loop
     * One of the popular cases that using useState inside of useEffect
     * will not cause an infinite loop is when you pass an empty array
     * as a second argument to useEffect like useEffect(() => {....}, [])
     * which means that the effect function should be called once:
     * after the first mount/render only.
     */
    await getAllMovies().then((movies) => {
      setMovieList(movies.data.data);
    });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id' // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Rating',
        accessor: 'rating'
      },
      {
        Header: 'Time',
        accessor: 'time'
      },
      {
        Header: '',
        accessor: 'delete'
      },
      {
        Header: '',
        accessor: 'update'
      }
    ],
    []
  );

  const data = React.useMemo(
    () => {
      if (movieList.length === 0) {
        return [
          {
            _id: 'Data',
            name: 'Not',
            rating: 'Loaded',
            time: 'Yet'
          }
        ];
      }
      console.log(movieList);
      const movieRow = movieList.map((movie) => {
        return {
          _id: movie._id,
          name: movie.name,
          rating: movie.rating,
          time: movie.time.join(' / '),
          delete: <DeleteMovie id={movie._id} />,
          update: <UpdateMovie id={movie._id} />
        };
      });
      return movieRow;
    },
    /**
     * ! always add empty array to useMemo()
     * If no array is provided, a new value will be computed on every render
     */ []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    (hooks) => {
      // eslint-disable-next-line no-shadow
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns
      ]);
    }
  );

  return (
    <div>
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
  );
};

export default MoviesList;
