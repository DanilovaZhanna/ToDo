import {LOGIN, LOGOUT, BAD_QUERY, LOADING} from '../Redux/constants';
const initUser = {
    name: '',
    role: '',
    login: false, 
    error: '',
    loading: false
};


export const userReducer = (state=initUser,action) => {
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
        default: 
            return state;
    }
}

// разбить по файликам
const initService = {
    errors:null,
    loading:false
};

export const serviceReducer = (state = initService, action) => {
    switch(action.type) {
        case BAD_QUERY: return {
            ...state,
            errors:action.message
        };
        case LOADING: return {
            ...state,
            loading:!state.loading
        };
        default: return state;
    }
}