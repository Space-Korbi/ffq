/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import ReactTable from 'react-table';
import styled from 'styled-components';
import { getAllMovies } from '../../api';
import UpdateMovie from './UpdateMovie';
import DeleteMovie from './DeleteMovie';

import 'react-table/react-table.css';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: false
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await getAllMovies().then((movies) => {
      this.setState({
        movies: movies.data.data,
        isLoading: false
      });
    });
  };

  render() {
    const { movies, isLoading } = this.state;
    console.log('TCL: MoviesList -> render -> movies', movies);

    const columns = [
      {
        Header: 'ID',
        accessor: '_id',
        filterable: true
      },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true
      },
      {
        Header: 'Rating',
        accessor: 'rating',
        filterable: true
      },
      {
        Header: 'Time',
        accessor: 'time',
        Cell: (props) => <span>{props.value.join(' / ')}</span>
      },
      {
        Header: '',
        accessor: '',
        Cell(props) {
          return (
            <span>
              <DeleteMovie id={props.original._id} />
            </span>
          );
        }
      },
      {
        Header: '',
        accessor: '',
        Cell(props) {
          return (
            <span>
              <UpdateMovie id={props.original._id} />
            </span>
          );
        }
      }
    ];

    let showTable = true;
    if (!movies.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={movies}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default MoviesList;
