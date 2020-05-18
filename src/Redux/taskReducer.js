import {ADD_TODO, UPLOAD_TODO, TURN_OFF_LOADING_TODO, TURN_ON_LOADING_TODO, 
        DEL_TODO, CHANGE_TODO, OPEN_MODAL, CLOSE_MODAL} from './constants'

const initState = {
    todos: [],
    loading: false,
    canClose: false
}

const taskReducer = (state=initState, action) => { 
    switch (action.type) { 
        case ADD_TODO: {
            const {id, title, description, createdBy} = action;
            return {
                ...state,
                todos: [...state.todos, {id, title, description, createdBy}]
                }
            }
        case UPLOAD_TODO: return {
            ...state,
            todos: action.array
        }
        case CHANGE_TODO:  return {
            ...state,
            todos: state.todos.map((el) => (el.id === +action.id) ? 
                {...el, title: action.title, description: action.description} : el)          
        }
        case DEL_TODO: 
            return {
            ...state,
            todos: state.todos.filter((el) => el.id !== action.id)
        }
        case TURN_OFF_LOADING_TODO:
            return {
                ...state,
                loading: false
            }
        case TURN_ON_LOADING_TODO: 
            return {
                ...state,
                loading: true
            }          
        case OPEN_MODAL: 
            return {
                ...state,
                canClose: false
            }  
        case CLOSE_MODAL:
            return {
                ...state,
                canClose: true
            }
        default: 
            return state; 
    } 
  } 

  export default taskReducer;