import React, {useState, useEffect} from 'react'
import TodoItem from '../Todo-item/Todo-item'
import { deleteTask, upload } from '../../Redux/taskActionCreators'
import { connect } from 'react-redux'
import Modal from '../Modal/Modal' 

import './Todolist.css'
import LoadingScreen from '../LoadingScreen/LoadindScreen'

const TodoList = ({ getAll, delTask, todos, loading }) => {

    const [modal, setModal] = useState({isModalOpen: false, id: null})

    // меняет состояние модального окна, если сюда передается id значит откроется change, если нет add
    const toggleModal = (id = null) => {
        setModal({isModalOpen: !modal.isModalOpen, id})
        }

    useEffect(() => {getAll()}, [getAll])

    return (
    <div className='Main'>
        <div className="fAdd">
            <div>Add</div> 
            <button type="button" className="btn btnPlus btn-color mx-2" onClick={() => toggleModal()}>
                <i className="fa fa-plus"></i>
            </button>
        </div>
        
        {modal.isModalOpen && (
            <Modal onClose={toggleModal} isAdd={modal.id === null} id={modal.id}/>
        )}

        <div className="wMain"> 
            <h3>Todos</h3>
            { (loading && !modal.isModalOpen) ? <LoadingScreen isLoad={true} /> :
            (<ul className="todo-list list-group">
                {todos.map((todo) => {
                    return (<li key={todo.id} className="list-group-item">              
                    <TodoItem todo={todo}  onChange={() => (toggleModal(todo.id))}
                                            delTask={() => (delTask(todo.id))}/>
                    </li>
                    )})}
            </ul>) }   
        </div>      
    </div>          
    )
}
 
function mapStateToProps(state) {
  return {
    todos: state.task.todos,
    loading: state.task.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(upload()),
    delTask: (id) => dispatch(deleteTask(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

