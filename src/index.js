import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './components/Router';
import AdminDatabase from './shared/AdminDatabase';

ReactDOM.render((
	<StrictMode>
		<MuiThemeProvider>
			<AdminDatabase>
				<Routes/>
			</AdminDatabase>	
		</MuiThemeProvider>
	 </StrictMode>
),document.getElementById('root'));
  