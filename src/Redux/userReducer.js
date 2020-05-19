import {LOGIN, LOGOUT, GOT_ME, LOAD_USERS, TURN_ON_LOADING_USER, TURN_OFF_LOADING_USER} from '../Redux/constants';

// login - авторизован ли пользователь или нет, me - получен ли ответ с /me или нет
const initUser = {
    name: '',
    role: '',
    login: false, 
    error: '',
    loading: false,
    me: false,
    users: []
};


const userReducer = (state=initUser, action) => {
    switch(action.type) {
        case LOGIN: return {
            ...state,
            name:action.name,
            role:action.role,
            login:true
        }
        case LOGOUT: return {
            ...initUser,
            me: true
        }
        case LOAD_USERS: return {
            ...state,
            users: action.users
        }
        case GOT_ME: return {
            ...state,
            me: true
        }
        case TURN_ON_LOADING_USER: return {
            ...state,
            loading: true
        }
        case TURN_OFF_LOADING_USER: return {
            ...state,
            loading: false
        }
        default: 
            return state;
    }
}

export default userReducer