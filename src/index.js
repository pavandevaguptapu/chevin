import React from 'react';
import ReactDOM from 'react-dom';
import {Route,HashRouter} from 'react-router-dom';
import Login from './login.js';
import Dashboard from './dashboard.js';
import Account from './account.js';

ReactDOM.render((
     <HashRouter>
	 <div>
			<Route exact path="/" component={Login}/>
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/account" component={Account}/>
		
			</div>
     </HashRouter> 
     ),document.getElementById('root'));
  