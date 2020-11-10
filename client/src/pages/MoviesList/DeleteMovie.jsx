import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { deleteMovieById } from '../../api';

const Delete = styled.div`
  color: #ff0000;

  cursor: pointer;
`;

class DeleteMovie extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    /**
     * * Destructuring props
     * const { name, city } = this.props;
     * is equivalent to
     * const name = this.props.name
     * const city = this.props.city
     * See also {@https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0}
     */
    const { id } = this.props;

    if (window.confirm(`Do tou want to delete the movie ${id} permanently?`)) {
      deleteMovieById(id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

DeleteMovie.propTypes = {
  id: PropTypes.string.isRequired
};

export default DeleteMovie;
