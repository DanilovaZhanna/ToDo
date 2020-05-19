import React from 'react'
import TodoItem from '../Todo-item/Todo-item'
import { deleteTask, upload } from '../../Redux/taskActionCreators'
import { connect } from 'react-redux'
import Modal from '../Modal/Modal' 

import './Todolist.css'
import LoadingScreen from '../LoadingScreen/LoadindScreen'

class TodoList extends React.Component {

    state = {
        // открыто ли модальное окно
        isModalOpen: false,  
        id: null      
    }

    // меняет состояние модального окна, если сюда передается id значит откроется change, если нет add
    toggleModal = (id = null) => {
        this.setState(state => { 
           return {isModalOpen: !state.isModalOpen, id}
        })
    }

    componentDidMount = () => (this.props.getAll())

    render() {
        return(
        <div className='Main'>
            <div className="fAdd">
                <div>Add</div> 
                <button type="button" className="btn btnPlus btn-color mx-2" onClick={() => this.toggleModal()}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            
            {this.state.isModalOpen && (
                <Modal onClose={this.toggleModal} isAdd={this.state.id === null} id={this.state.id}/>
            )}

            <div className="wMain"> 
                <h3>Todos</h3>
                { (this.props.loading && !this.state.isModalOpen) ? <LoadingScreen isLoad={true} /> :
                (<ul className="todo-list list-group">
                    {this.props.todos.map((todo) => {
                        return (<li key={todo.id} className="list-group-item">              
                        <TodoItem todo={todo}  onChange={() => (this.toggleModal(todo.id))}
                                                delTask={() => (this.props.delTask(todo.id))}/>
                        </li>
                        )})}
                </ul>) }   
            </div>      
        </div>        
        )
    }
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

