/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditableTable from './EditableTable';
import { getAllMovies } from '../../api';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

const MoviesList = () => {
  // Declare a new state variable, which we'll call "movie"
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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
        accessor: 'delete',
        Cell: ({ row: { original } }) => <DeleteMovie id={original._id} />
      },
      {
        Header: '',
        accessor: 'update',
        Cell: ({ row: { original } }) => <UpdateMovie id={original._id} />
      }
    ],
    []
  );

  const data = React.useMemo(() => {
    const movieRow = movieList.map((movie) => {
      return {
        _id: movie._id,
        name: movie.name,
        rating: movie.rating,
        time: movie.time.join(' / ')
      };
    });
    return movieRow;
  });

  /**
   * TODO update Data on server
   * @param {rowIndex}
   * @param {columnId}
   * @param {value}
   * This function gets the the changed value from the cell,
   * specified by rowIndex and columnIndex and updates the
   * Database accordingly
   */
  // eslint-disable-next-line no-unused-vars
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    console.log('Updating data:');
    console.log('rowIndex', rowIndex);
    console.log('columnId', columnId);
    console.log('value', value);
    /* setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    ); */
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <EditableTable columns={columns} data={data} updateMyData={updateMyData} />
        </div>
      )}
    </div>
  );
};

export default MoviesList;
