import {LOGIN, LOGOUT, BAD_QUERY, LOADING_USER } from './constants';
import {loginPOST, logoutPOST, meGET} from '../serverAPI/api';

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

export const changeLoad = () => {
    return {
        type: LOADING_USER
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(alert_error(null))
        dispatch(changeLoad());
        logoutPOST()
        .then(() => {
           dispatch(logout_set()) 
           dispatch(changeLoad());
        })  
        .catch(err => {
            dispatch(changeLoad());
            dispatch(alert_error(err.response.data.message));
        })
    }
}

export const login = (name, password) => {
    return dispatch => {
        dispatch(alert_error(null))
        dispatch(changeLoad());
        loginPOST(name, password)
        .then(response => { console.log(response.data);
           const {name, role} = response.data;
           dispatch(login_set(name, role)) 
        })  
        .catch(err => {
            dispatch(alert_error(err.response.data.message));
        })
        .finally(()=>{
            dispatch(changeLoad());
        });
    }
}

export const me = () => {
    return dispatch => {
        dispatch(changeLoad());
        meGET()
        .then(response => { 
            const {name, role} = response.data;
            dispatch(login_set(name, role));
        })  
        .catch(err => { console.log(err);
        })
        .finally(()=>{
            dispatch(changeLoad());
        });
    }
}

function errorHandler(error) {
    // 
}