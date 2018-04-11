import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Router from './components/Router';


ReactDOM.render((
	<MuiThemeProvider >
		<Router/>
	 </MuiThemeProvider >
),document.getElementById('root'));
  