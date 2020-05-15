import {createStore, applyMiddleware, combineReducers} from 'redux';
import userReducer from './userReducer';
import taskReducer from './taskReducer';
import thunk from 'redux-thunk';

export default () => {
    return createStore( combineReducers({ task: taskReducer, user: userReducer}),
     applyMiddleware(thunk))     
}

