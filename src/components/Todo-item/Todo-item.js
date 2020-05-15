import React from 'react'
import { Link } from 'react-router-dom'

import './Todo-item.css'

const TodoItem = ({ todo, delTask }) => {
    return (
    <span>
        <span className="todo-list-item-label">{todo.title}</span>
        <button type="button" className="btn btn-color float-right mx-2" onClick={delTask} >
            <i className="fa fa-trash-o"></i>
        </button>
        <Link to={'/edit/'+todo.id}>
            <button type="button" className="btn btn-inf float-right mx-2">        
                    <i className="fa fa-edit"></i>
            </button>
        </Link>
        <span className="font-italic float-right">{todo.description} </span>
    </span>
    )
}


 export default TodoItem; 