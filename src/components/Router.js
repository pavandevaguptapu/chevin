import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login';
import ManageCustomerTeams from './Admin/ConfigureTeams/manageCustomerTeams';
import People from './Admin/PersonDetails/People';
import jumpstart from './Admin/ConfigureJumpstart/jumpstart';
import App from './App'
import TeamsBaseLayout from './Dashboard/TeamsBaseLayout';
import LoginNew from '../shared/LoginNew';
import Refactor from './some/Refactor';

const Routes = () => (
   <Router basename={process.env.PUBLIC_URL}>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={TeamsBaseLayout} />
        <Route path="/login" component={LoginNew} />
        <Route path="/refa" component={Refactor} />
        <App>
          <Route
            path="/app/manageCustomerTeams"
            component={ManageCustomerTeams}
          />
          <Route path="/app/people" component={People} />
          <Route path="/app/jumpstart" component={jumpstart} />
        </App>
        <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    </div>
  </Router>
);

export default Routes;