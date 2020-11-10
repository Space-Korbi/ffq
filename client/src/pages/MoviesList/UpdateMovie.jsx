import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

class UpdateMovie extends Component {
  updateUser = (event) => {
    event.preventDefault();
    const { id } = this.props;
    window.location.href = `/movies/update/${id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

UpdateMovie.propTypes = {
  id: PropTypes.string.isRequired
};

export default UpdateMovie;
