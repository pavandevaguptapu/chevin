import {createStore} from 'redux';
import rootReducer from '../reducers/index';
import teamReducer from '../reducers/teamReducer';


const store = createStore(teamReducer);

export default store;