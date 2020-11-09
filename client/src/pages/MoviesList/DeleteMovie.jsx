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
