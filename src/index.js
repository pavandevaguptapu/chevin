import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './components/Router';
import MyProvider from './components/MyProvider';

ReactDOM.render((
	<StrictMode>
		<MuiThemeProvider>
			<MyProvider>
				<Routes/>
			</MyProvider>	
		</MuiThemeProvider>
	 </StrictMode>
),document.getElementById('root'));
  