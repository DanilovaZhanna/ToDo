import React from 'react'
import { connect } from 'react-redux'

import './Todo-item.css'

const mainRole = 'admin'
const TodoItem = ({ todo, delTask, onChange, role, name }) => {
    return (
    <span className='item'> 
        <div>
            Title: {todo.title}
            <br/>
            Description: {todo.description}  
            <br/> 
            Created By: {todo.createdBy}
        </div>
        { (role === mainRole || role === todo.createdBy) ?
        (<div><button type="button" className="btn btn-color float-right mx-2" onClick={delTask} >
            <i className="fa fa-trash-o"></i>
        </button>
        <button type="button" className="btn btn-inf float-right mx-2" onClick={onChange} >       
                <i className="fa fa-edit"></i>
        </button></div>) : null
        }
    </span>
    )
}

function mapStateToProps(state) {
    return {        
        role: state.user.role,
        name: state.user.name
    }
} 
 export default connect(mapStateToProps, null)(TodoItem)