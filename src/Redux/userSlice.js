import { createSlice } from '@reduxjs/toolkit'

const initState = {
    name: '',
    role: '',
    login: false, 
    error: '',
    loading: false,
    me: false,
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        LOGIN: (state, action) => {
            const {name, role} = action.payload
            state.name = name;
            state.role = role;
            state.login = true;
        },
        LOGOUT: (state) => { 
            state.name = ''
            state.role = ''
            state.login = false
            state.error = ''
            state.loading = false
            state.users = []
            state.me = true; 
        },
        TURN_OFF_LOADING_USER: (state) => {
            state.loading = false;
        },
        TURN_ON_LOADING_USER: (state) => {
            state.loading = true; 
        },
        LOAD_USERS: (state, action) => {
            state.users = action.payload;
        },
        GOT_ME: (state) => { 
            state.me = true;
        }
    }
})
  
const {actions, reducer} = userSlice; 
export const { LOGIN, LOGOUT, TURN_OFF_LOADING_USER, TURN_ON_LOADING_USER, LOAD_USERS, GOT_ME } = actions;
export default reducer;