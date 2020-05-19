import { UPLOAD_TODO, ADD_TODO, TURN_OFF_LOADING_TODO, TURN_ON_LOADING_TODO, 
            DEL_TODO, CHANGE_TODO, OPEN_MODAL, CLOSE_MODAL } from './constants'
import { getTodos, addTodo, delTodo, editTodo } from '../serverAPI/api';
import { errorHandler, ErrorCount, throwError } from './appActionCreator'

// загрузить весь список
export const uploadAct = (todos) => {
    return {
        type: UPLOAD_TODO,
        array: todos
    }
} 

// редактировать тудушку
const change = (id, title, description) => {
    return {
        type: CHANGE_TODO,
        id,
        title,
        description
    }
}

// добавлять тудушку
const addAct = (id, title, description, createdBy) => {
    return {
        type: ADD_TODO,
        id,
        title,
        createdBy,
        description
    }
}

// удалить тудушку
const delAct = (id) => {
    return {
        type: DEL_TODO,
        id
    }
}

// остановить loading
export const offLoad = () => {
    return {
        type: TURN_OFF_LOADING_TODO
    }
}

// включить loading
const onLoad = () => {
    return {
        type: TURN_ON_LOADING_TODO
    }
}

// модальное окно нельзя закрыть
export const openModal = () => {
    return {
        type: OPEN_MODAL
    }
}

// модально окно можно закрыть
const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}

const errorEdit = new ErrorCount()
// если все успешно то меняем в редаксе список, разрешаем закрыть модальное окно
// аналогично с добавлением
export const edit = (id, title, description) => {
    return dispatch => {        
        dispatch(onLoad())
        editTodo(id, {title, description}) 
        .then(() => {             
           dispatch(change(id, title, description))
           dispatch(closeModal())
           success(dispatch, errorEdit)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(edit(id, title, description)), count:errorEdit}));
        })
    }
}

const errorAdd = new ErrorCount()
export const add = (title, description) => {
    return dispatch => {     
        dispatch(onLoad())   
        addTodo({title, description})      
        .then((response) => {
           const { id, title, description, createdBy } = response.data
           dispatch(addAct(id, title, description, createdBy))
           dispatch(closeModal())
           success(dispatch, errorAdd)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(add(title, description)), count:errorAdd}));
        })
    }
}

const errorDelete = new ErrorCount()
export const deleteTask = (id) => {
    return dispatch => {
        dispatch(onLoad())
        delTodo(id)
        .then(() => { 
            dispatch(delAct(id))
            success(dispatch, errorDelete)
        })
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(deleteTask(id)), count:errorDelete}));
        })
    }
}

const errorUpload = new ErrorCount()
export const upload = () => {
    return dispatch => {        
        dispatch(onLoad())
        getTodos()        
        .then((response) => {
           dispatch(uploadAct(response.data))
           success(dispatch, errorUpload)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:offLoad, method: ()=> dispatch(upload()), count:errorUpload}));
        })
    }
}

// если все успешно то loading ставим в false, ошибки стираем, обнуляем счетчик обратно
const success = (dispatch, errorCount) => {    
    dispatch(offLoad());    
    dispatch(throwError(null))
    errorCount.reset();
}
