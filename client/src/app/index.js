import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import my components
import Dashboard from '../components/Dashboard';

// const researcherID = '1234';
// const participantID = '5678';

/**
 * * Routing
 * The Switch component will render the first route that matches that pattern.
 * Order is important. Since the router will exit as soon as it finds a match,
 * always put a more specific route before a less specific route.
 */
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/user/:id" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
