import {LOGIN, LOGOUT, LOAD_USERS, TURN_ON_LOADING_USER, TURN_OFF_LOADING_USER, GOT_ME } from './userSlice';
import {loginPOST, logoutPOST, meGET, usersGET} from '../serverAPI/api'
import { errorHandler, ErrorCount, ERROR } from './appSlice'

const errorLogout = new ErrorCount();
export const logout = () => {
    return dispatch => {
        dispatch(TURN_ON_LOADING_USER());
        logoutPOST()
        .then(() => {
           dispatch(LOGOUT()) 
           success(dispatch, errorLogout)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_USER, method: ()=> dispatch(logout()), count:errorLogout}));
        })
    }
}

const errorLoad = new ErrorCount();
export const loadUsers = () => {
    return dispatch => {
        dispatch(TURN_ON_LOADING_USER())
        usersGET()
        .then((res) => {
            dispatch((LOAD_USERS(res.data)))
            success(dispatch, errorLoad)
        })
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_USER, method: ()=> dispatch(loadUsers()), count:errorLoad}));
        })
    }
}

const errorLogin = new ErrorCount();
export const login = (name, password) => {
    return dispatch => {
        dispatch(TURN_ON_LOADING_USER())
        loginPOST(name, password)
        .then(response => { 
           const {name, role} = response.data;
           dispatch(LOGIN({name, role})) 
           success(dispatch, errorLogin)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_USER, method: ()=> dispatch(login(name, password)), count:errorLogin}));
        })
    }
}

// отправляем me, если все ок или 401 то ставим в редаксе me в true, что ответ получен
// если он авторизован записываем имя и роль
const errorMe = new ErrorCount();
export const me = () => {
    return dispatch => { 
        dispatch(TURN_ON_LOADING_USER()); 
        meGET()
        .then(response => { 
            const {name, role} = response.data;
            dispatch(LOGIN({name, role}));
            dispatch(GOT_ME());
            success(dispatch, errorMe)
        })  
        .catch(err => { dispatch(errorHandler(err, {hider:TURN_OFF_LOADING_USER, method: ()=> dispatch(me()), count:errorMe}));
        })
    }
}

// если все успешно то в санке loading ставим в false, ошибки стираем, обнуляем счетчик обратно
const success = (dispatch, errorCount) => {    
    dispatch(TURN_OFF_LOADING_USER());    
    dispatch(ERROR(null))
    errorCount.reset();
}