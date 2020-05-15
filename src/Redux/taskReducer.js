import {ADD_TODO, UPLOAD_TODO, LOADING_TODO, DEL_TODO, CHANGE_TODO} from './constants'

const initState = {
    todos: [],
    error: '',
    loading: false
}

const taskReducer = (state=initState, action) => { 
    switch (action.type) { 
      case ADD_TODO: return {
        ...state,
        todos: [...state.todos, {id: action.id, name: action.name, status: action.status}]
      }
      case UPLOAD_TODO: return {
        ...state,
        todos: action.array
      }
      case LOADING_TODO: return {
        ...state,
        loading: !state.loading
      }
      case CHANGE_TODO:  return {
        ...state,
        todos: [...state.todos.filter((el) => el.id !== +action.id), 
              {id: +action.id, name: action.name, status: action.status}].sort((a, b)=> a.id - b.id)
      }
      case DEL_TODO: 
        return {
        ...state,
        todos: state.todos.filter((el) => el.id !== action.id)
      }
      default: 
        return state; 
    } 
  } 

  export default taskReducer;