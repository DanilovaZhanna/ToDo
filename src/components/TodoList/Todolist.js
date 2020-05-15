import React, {useEffect} from 'react'
import TodoItem from '../Todo-item/Todo-item'
import { deleteTask, upload } from '../../Redux/taskActionCreators'
import { connect } from 'react-redux'

import './Todolist.css'

const TodoList = ({ todos, delTask, getAll }) => {

   useEffect(() => getAll(), [] )

  console.log(todos)
    return (
    <div className='Main'>
        <div className="fAdd">
            <div>Add</div> 
            <button type="button" className="btn btn-color mx-2" >
                <i className="fa fa-plus"></i>
            </button>
        </div>
        
        <div className="wMain">
            <h3>Todos</h3>
            <ul className="todo-list list-group">
            {
            todos.map((todo) => {
                return (<li key={todo.id} className="list-group-item">              
                <TodoItem todo={todo} delTask={() => (delTask(todo.id))}/>
                </li>
                )
            })
            }
            </ul>
      </div>        
    </div>
        
    )
}
 
function mapStateToProps(state) {
  return {
    todos: state.task.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: () => dispatch(upload()),
    delTask: (id) => dispatch(deleteTask(id))  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)

