import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './components/Router';


ReactDOM.render((
	<StrictMode>
		<MuiThemeProvider >
			<Routes/>
		</MuiThemeProvider >
	 </StrictMode>
),document.getElementById('root'));
  