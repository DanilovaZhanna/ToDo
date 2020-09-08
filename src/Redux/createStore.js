import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appSlice'
import taskReducer from './taskSlice'
import userReducer from './userSlice'

export default () => {
    return createStore( combineReducers({ task: taskReducer, user: userReducer, app:appReducer}),
    applyMiddleware(thunk))     
}


