import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        todos: [],
        loading: false,
        canClose: false
    },
    reducers: {
        ADD_TODO: (state, action) => {
            const {id, title, description, createdBy} = action.payload;
            state.todos.push({id, title, description, createdBy})
        },
        UPLOAD_TODO: (state, action) => {
            state.todos = action.payload
        },
        CHANGE_TODO: (state, action) => {
            const {id, title, description} = action.payload;
            state.todos = state.todos.map((el) => (el.id === +id) ? 
            {...el, title, description} : el)
        },
        DEL_TODO: (state, action) => {
            state.todos = state.todos.filter((el) => el.id !== action.payload)
        },
        TURN_OFF_LOADING_TODO: (state) => {
            state.loading = false
        },
        TURN_ON_LOADING_TODO: (state) => {
            state.loading = true
        },
        RESET_MODAL: (state) => {
            state.canClose = false
        },
        CLOSE_MODAL: (state) => {
            state.canClose = true
        }
    }
})
  
const {actions, reducer} = taskSlice;
export const { ADD_TODO, DEL_TODO, CHANGE_TODO, UPLOAD_TODO, TURN_OFF_LOADING_TODO, TURN_ON_LOADING_TODO,
RESET_MODAL, CLOSE_MODAL } = actions;
export default reducer;