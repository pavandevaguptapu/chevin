import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../login';
import ManageCustomerTeams from '../manageCustomerTeams';
import Dashboard from '../dashboard';
import People from './PersonDetails/People';
import Account from '../account';
import App from './App'
import TeamsBaseLayout from './Dashboard/TeamsBaseLayout';
import LoginNew from '../shared/LoginNew';
import GriLayout from './GriLayout';
import DashboardAdvanced from './re-dashboard/DashboardAdvanced';
// import IndividualDetails from './PersonDetails/IndividualDetails';

const Routes = () => (
   <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={TeamsBaseLayout} />
        <Route path="/login" component={LoginNew} />
        <Route path="/grid" component={GriLayout} />
        <Route path="/dash" component={DashboardAdvanced} />
        <App>
          <Route
            path="/app/manageCustomerTeams"
            component={ManageCustomerTeams}
          />
          <Route path="/app/people" component={People} />
          <Route path="/app/account" component={Account} />
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