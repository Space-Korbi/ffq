/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StandardTable from './Table';
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
        accessor: 'delete'
      },
      {
        Header: '',
        accessor: 'update'
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
        time: movie.time.join(' / '),
        delete: <DeleteMovie id={movie._id} />,
        update: <UpdateMovie id={movie._id} />
      };
    });
    return movieRow;
  });

  return (
    <div>{loading ? <div>Loading...</div> : <StandardTable columns={columns} data={data} />}</div>
  );
};

export default MoviesList;
