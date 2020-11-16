import React, { Component } from 'react';
import styled from 'styled-components';
import { getMovieById, updateMovieById } from '../api';

const Title = styled.h1.attrs({
  className: 'h1'
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group'
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: 'form-control'
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

class MoviesUpdate extends Component {
  /**
   * * Constructor
   * Typically, in React constructors are only used for two purposes:
   * - Initializing local state by assigning an object to this.state.
   * - Binding event handler methods to an instance.
   * You should not call setState() in the constructor()
   * Instead, if your component needs to use local state,
   * assign the initial state to this.state directly in the constructor
   *    constructor(props) {
   *      super(props);
   *      this.state = { counter: 0 };
   *      this.handleClick = this.handleClick.bind(this);
   *  }
   */
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment, react/prop-types
      id: this.props.match.params.id,
      name: '',
      rating: '',
      time: ''
    };
  }

  handleChangeInputName = async (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  handleChangeInputRating = async (event) => {
    const { rating } = this.state;
    const ratingNew = event.target.validity.valid ? event.target.value : rating;
    this.setState({ rating: ratingNew });
  };

  handleChangeInputTime = async (event) => {
    const time = event.target.value;
    this.setState({ time });
  };

  handleUpdateMovie = async () => {
    const { id, name, rating, time } = this.state;
    const arrayTime = time.split('/');
    const payload = { name, rating, time: arrayTime };

    await updateMovieById(id, payload).then(() => {
      // eslint-disable-next-line no-alert
      window.alert(`Movie updated successfully`);
      this.setState({
        name: '',
        rating: '',
        time: ''
      });
    });
  };

  componentDidMount = async () => {
    const { id } = this.state;
    const movie = await getMovieById(id);

    this.setState({
      name: movie.data.data.name,
      rating: movie.data.data.rating,
      time: movie.data.data.time.join('/')
    });
  };

  render() {
    const { name, rating, time } = this.state;
    return (
      <Wrapper>
        <Title>Create Movie</Title>

        <Label>Name: </Label>
        <InputText type="text" value={name} onChange={this.handleChangeInputName} />

        <Label>Rating: </Label>
        <InputText
          type="number"
          step="0.1"
          lang="en-US"
          min="0"
          max="10"
          pattern="[0-9]+([,\.][0-9]+)?"
          value={rating}
          onChange={this.handleChangeInputRating}
        />

        <Label>Time: </Label>
        <InputText type="text" value={time} onChange={this.handleChangeInputTime} />

        <Button onClick={this.handleUpdateMovie}>Update Movie</Button>
        <CancelButton href="/movies/list">Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default MoviesUpdate;
