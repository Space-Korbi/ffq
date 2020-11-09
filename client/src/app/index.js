import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import my components
import { NavBar } from '../components';
import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages';

// Import Bootstrap’s ready-to-use css
import 'bootstrap/dist/css/bootstrap.min.css';

// * The app’s entry point
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/movies/list" exact component={MoviesList} />
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route path="/movies/update/:id" exact component={MoviesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
