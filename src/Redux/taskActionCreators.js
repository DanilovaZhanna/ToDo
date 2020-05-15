import { UPLOAD_TODO, LOADING_TODO, ADD_TODO, DEL_TODO, CHANGE_TODO } from './constants'
import { getTodos, addTodo, delTodo, changeTodo } from '../serverAPI/api';

export const uploadAct = (todos) => {
    return {
        type: UPLOAD_TODO,
        array: todos
    }
} 

const changeLoad = () => {
    return {
        type: LOADING_TODO
    }
}

const change = (id, name, status) => {
    return {
        type: CHANGE_TODO,
        id,
        name,
        status
    }
}

const addAct = (id, name, status) => {
    return {
        type: ADD_TODO,
        id,
        name,
        status
    }
}

const delAct = (id) => {
    return {
        type: DEL_TODO,
        id
    }
}

export const put = (id, name, status) => {
    return dispatch => {        
        changeTodo(id, name, status) 
        .then((res) => { console.log(res);
           dispatch(change(id, name, status))
        })  
        .catch(err => {
            dispatch(changeLoad)
        })
    }
}

export const add = (name, status) => {
    return dispatch => {        
        addTodo(name, status)      
        .then((response) => {
           console.log(response.data)
           const { id, name, status } = response.data
           dispatch(addAct(id, name, status))
        })  
        .catch(err => {
            dispatch(changeLoad)
        })
    }
}

export const deleteTask = (id) => {
    return dispatch => {
        delTodo(id)
        .then(() => { 
            dispatch(delAct(id))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const upload = () => {
    return dispatch => {        
        dispatch(changeLoad)
        getTodos()        
        .then((response) => {
           dispatch(uploadAct(response.data))
        })  
        .catch(err => {
            dispatch(changeLoad)
        })
    }
}