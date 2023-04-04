import { legacy_createStore as createStore, combineReducers } from 'redux';
import collapsedReducer from './reducers/collapsedReducer.js';
import spinReducer from './reducers/spinReducer.js';

const reducers = combineReducers({ collapsedReducer ,spinReducer});
const store = createStore(reducers);
export default store;