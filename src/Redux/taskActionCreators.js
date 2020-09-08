import { UPLOAD_TODO, ADD_TODO, TURN_OFF_LOADING_TODO, TURN_ON_LOADING_TODO, 
            DEL_TODO, CHANGE_TODO, CLOSE_MODAL } from './taskSlice'
import { getTodos, addTodo, delTodo, editTodo } from '../serverAPI/api'
import { errorHandler, ErrorCount, ERROR } from './appSlice'

const errorEdit = new ErrorCount()
// если все успешно то меняем в редаксе список, разрешаем закрыть модальное окно
// аналогично с добавлением
export const edit = (id, title, description) => {
    return dispatch => {        
        dispatch(TURN_ON_LOADING_TODO())
        editTodo(id, {title, description}) 
        .then(() => {             
           dispatch(CHANGE_TODO({id, title, description}))
           dispatch(CLOSE_MODAL())
           success(dispatch, errorEdit)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_TODO, method: ()=> dispatch(edit(id, title, description)), count:errorEdit}));
        })
    }
}

const errorAdd = new ErrorCount()
export const add = (title, description) => {
    return dispatch => {     
        dispatch(TURN_ON_LOADING_TODO())   
        addTodo({title, description})      
        .then((response) => {
           const { id, title, description, createdBy } = response.data
           dispatch(ADD_TODO({id, title, description, createdBy}))
           dispatch(CLOSE_MODAL())
           success(dispatch, errorAdd)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_TODO, method: ()=> dispatch(add(title, description)), count:errorAdd}));
        })
    }
}

const errorDelete = new ErrorCount()
export const deleteTask = (id) => {
    return dispatch => {
        dispatch(TURN_ON_LOADING_TODO())
        delTodo(id)
        .then(() => { 
            dispatch(DEL_TODO(id))
            success(dispatch, errorDelete)
        })
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_TODO, method: ()=> dispatch(deleteTask(id)), count:errorDelete}));
        })
    }
}

const errorUpload = new ErrorCount()
export const upload = () => {
    return dispatch => {        
        dispatch(TURN_ON_LOADING_TODO())
        getTodos()        
        .then((response) => { 
           dispatch(UPLOAD_TODO(response.data))
           success(dispatch, errorUpload)
        })  
        .catch(err => { dispatch(errorHandler(err, { hider:TURN_OFF_LOADING_TODO, method: ()=> dispatch(upload()), count:errorUpload}));
        })
    }
}

// если все успешно то loading ставим в false, ошибки стираем, обнуляем счетчик обратно
const success = (dispatch, errorCount) => {    
    dispatch(TURN_OFF_LOADING_TODO());    
    dispatch(ERROR(null))
    errorCount.reset();
}
