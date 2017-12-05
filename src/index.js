import React from 'react';
import ReactDOM from 'react-dom';
import {Route,HashRouter} from 'react-router-dom';
import Login from './login.js';
import Dashboard from './dashboard.js';
import Account from './account.js';
import manageCustomerTeams from './manageCustomerTeams.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
    
ReactDOM.render((
	<MuiThemeProvider >
     <HashRouter>
	 <div>
			<Route exact path="/" component={Login}/>
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/account" component={Account}/>
			<Route path="/manageCustomerTeams" component={manageCustomerTeams}/>
			</div>
     </HashRouter> 
	 </MuiThemeProvider >
     ),document.getElementById('root'));
  