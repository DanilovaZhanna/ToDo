import {LOGIN, LOGOUT, BAD_QUERY, LOAD_USERS, TURN_ON_LOADING_USER, TURN_OFF_LOADING_USER, GOT_ME } from './constants';
import {loginPOST, logoutPOST, meGET, usersGET} from '../serverAPI/api';

const login_set=(name, role)=> { 
    return {
        type: LOGIN,
        name,
        role
    }
}

const logout_set = () => {
    return {
        type: LOGOUT
    }
}

const alert_error = (message) => {
    return {
        type: BAD_QUERY,
        message
    }
} 

const getUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

const setMe = () => {
    return {
        type: GOT_ME
    }
}

export const onLoad = () => {
    return {
        type: TURN_ON_LOADING_USER
    }
}

export const offLoad = () => {
    return {
        type: TURN_OFF_LOADING_USER
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(alert_error(null))
        dispatch(onLoad());
        logoutPOST()
        .then(() => {
           dispatch(logout_set()) 
        })  
        .catch(err => {
            dispatch(alert_error(err.response.data.message));
        })
       .finally(() => dispatch(offLoad()))
    }
}

export const loadUsers = () => {
    return dispatch => {
        dispatch(onLoad())
        usersGET()
        .then((res) => {
            dispatch((getUsers(res.data)))
        })
        .finally(() => dispatch(offLoad()))
    }
}

export const login = (name, password) => {
    return dispatch => {
        dispatch(alert_error(null)) 
        dispatch(onLoad())
        loginPOST(name, password)
        .then(response => { 
           const {name, role} = response.data;
           dispatch(login_set(name, role)) 
        })  
        .catch(err => {
            dispatch(alert_error(err.response.data.message));
        })
        .finally(()=>{
            dispatch(setMe())
            dispatch(offLoad());
        });
    }
}

export const me = () => {
    return dispatch => {
        dispatch(onLoad());
        meGET()
        .then(response => { 
            const {name, role} = response.data;
            dispatch(login_set(name, role));
        })  
        .catch(err => { console.log(err);
        })
        .finally(()=>{
            dispatch(setMe())
            dispatch(offLoad())
        });
    }
}

function errorHandler(error) {
    // 
}