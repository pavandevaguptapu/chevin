import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../login';
import ManageCustomerTeams from '../manageCustomerTeams';
import Dashboard from '../dashboard';
import People from './People';
import Account from '../account';
import App from './App'

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path= "/" component={Login}   />
            <Route path="/dashboard" component= {Dashboard } />
            <Route path="/account" component={Account}/>
            <Route path="/app" component={App} />
            <Route path="/manageCustomerTeams" component={ManageCustomerTeams} />
            <Route path="/people" component={People} />
            <Route render= {function() {
                return <h1>Not Found</h1>
            }} />
        </Switch>
    </BrowserRouter>
);

export default Router;