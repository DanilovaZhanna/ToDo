import {LOGIN, LOGOUT, LOAD_USERS, TURN_ON_LOADING_USER, TURN_OFF_LOADING_USER, GOT_ME } from './constants';
import {loginPOST, logoutPOST, meGET, usersGET} from '../serverAPI/api';
import { errorHandler, ErrorCount, throwError } from './appActionCreator'

// запиcать в редакс имя и роль
const loginSet=(name, role)=> { 
    return {
        type: LOGIN,
        name,
        role
    }
}

export const logoutSet = () => {
    return {
        type: LOGOUT
    }
}

// получить список всех юзеров
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

const errorLogout = new ErrorCount();
export const logout = () => {
    return dispatch => {
        dispatch(onLoad());
        logoutPOST()
        .then(() => {
           dispatch(logoutSet()) 
           success(dispatch, errorLogout)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(logout()), count:errorLogout}));
        })
    }
}

const errorLoad = new ErrorCount();
export const loadUsers = () => {
    return dispatch => {
        dispatch(onLoad())
        usersGET()
        .then((res) => {
            dispatch((getUsers(res.data)))
            success(dispatch, errorLoad)
        })
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(loadUsers()), count:errorLoad}));
        })
    }
}

const errorLogin = new ErrorCount();
export const login = (name, password) => {
    return dispatch => {
        dispatch(onLoad())
        loginPOST(name, password)
        .then(response => { 
           const {name, role} = response.data;
           dispatch(loginSet(name, role)) 
           success(dispatch, errorLogin)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(login(name, password)), count:errorLogin}));
        })
    }
}

// отправляем me, если все ок или 401 то ставим в редаксе me в true, что ответ получен
// если он авторизован записываем имя и роль
const errorMe = new ErrorCount();
export const me = () => {
    return dispatch => {
        dispatch(onLoad());
        meGET()
        .then(response => { 
            const {name, role} = response.data;
            dispatch(loginSet(name, role));
            dispatch(setMe());
            success(dispatch, errorMe)
        })  
        .catch(err => { dispatch(errorHandler(err, {hider:offLoad, method: ()=> dispatch(me()), count:errorMe}));
        })
    }
}

// если все успешно то в санке loading ставим в false, ошибки стираем, обнуляем счетчик обратно
const success = (dispatch, errorCount) => {    
    dispatch(offLoad());    
    dispatch(throwError(null))
    errorCount.reset();
}