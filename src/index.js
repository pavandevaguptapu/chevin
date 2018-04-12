import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './components/Router';


ReactDOM.render((
	<MuiThemeProvider >
		<Routes/>
	 </MuiThemeProvider >
),document.getElementById('root'));
  