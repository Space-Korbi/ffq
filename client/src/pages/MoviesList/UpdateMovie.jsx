import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const UpdateMovie = (props) => {
  const { url } = useRouteMatch();
  const { id } = props;

  return (
    <Link to={`${url}/movies/update/${id}`} className="btn btn-outline-warning btn-sm">
      Update
    </Link>
  );
};

UpdateMovie.propTypes = {
  id: PropTypes.string.isRequired
};

export default UpdateMovie;
