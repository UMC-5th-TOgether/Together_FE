import { createStore, combineReducers } from 'redux';
import loginReducer from './LoginReducer';

const rootReducer = combineReducers({
    login: loginReducer,
});

const store = createStore(rootReducer);

export default store;