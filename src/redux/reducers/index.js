import { combineReducers } from 'redux';
import teamReducer from './teamReducer';

export default combineReducers({teamDetails: teamReducer});