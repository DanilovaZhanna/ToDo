import {LOGIN, LOGOUT, BAD_QUERY, LOADING_USER} from '../Redux/constants';

const initUser = {
    name: '',
    role: '',
    login: false, 
    error: '',
    loading: false
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
            ...initUser
        }
        case LOADING_USER: return {
            ...state,
            loading: !state.loading
        }
        default: 
            return state;
    }
}

export default userReducer