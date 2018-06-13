import React from 'react';
import { BrowserRouter as Router, Route, Redirect,Switch } from 'react-router-dom';
import Login from '../login';
import ManageCustomerTeams from './Admin/ConfigureTeams/manageCustomerTeams';
import People from './Admin/PersonDetails/People';
import jumpstart from './Admin/ConfigureJumpstart/jumpstart';
import Automation from './Admin/Automation/automation';
import App from './App'
import TeamsBaseLayout from './Dashboard/TeamsBaseLayout';
import LoginNew from '../shared/LoginNew';
import axios from 'axios';


const Routes = () => (
   <Router>         
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={TeamsBaseLayout} />
        <Route path="/login" component={LoginNew} />       
        <App>
          <Route  path="/app/manageCustomerTeams" component={()=>localStorage.getItem('token')!==null? <ManageCustomerTeams/>:<Redirect to='/'/>} />
          <Route path="/app/people" component={People} />
          <Route path="/app/jumpstart" component={jumpstart} />
          <Route path="/app/automation" component={Automation} />
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