import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './components/Router';

import store from './store/store';

ReactDOM.render((
	// <StrictMode>
		<MuiThemeProvider>
            <Provider store={store}>
			    <Routes/>
            </Provider>    
		</MuiThemeProvider>
	//  </StrictMode>
),document.getElementById('root'));
  