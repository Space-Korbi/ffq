import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import my components
import Dashboard from '../components/Dashboard';
import FFQParticipation from '../components/FFQ';

import { MoviesList, MoviesInsert, MoviesUpdate } from '../pages';

// * The app’s entry point
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div>
            <h2>Home</h2>
          </div>
        </Route>
        <Route path="/questionnaire" component={FFQParticipation} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/movies/list" exact component={MoviesList} />
        <Route path="/movies/create" exact component={MoviesInsert} />
        <Route path="/movies/update/:id" exact component={MoviesUpdate} />
      </Switch>
    </Router>
  );
}

export default App;
