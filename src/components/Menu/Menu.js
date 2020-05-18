import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {logout} from '../../Redux/userActionCreators'

import './Menu.css'

const style = {color: "#CC22E2"};


const Menu = ({auth, name, role, Logout}) => {    
    return (
        auth ? 
        (<nav className="menu">
            {auth ? (<h1>Welcome, {name}!</h1>) : null}
            <NavLink className='navlink' activeStyle={style} to='/todos'>To do list</NavLink>

            {role === 'admin' ? (
                <NavLink className='navlink' activeStyle={style} to='/users'>Users</NavLink>
            ) : null }

            {auth ? (
                <NavLink className='navlink' activeStyle={style} onClick={Logout} to='/logout'>Logout</NavLink>
            ) : null }
            
            {!auth ? (
                <NavLink className='navlink' activeStyle={style} to='/login'>Login</NavLink>
            ) : null}
        </nav>) : null    
    );
}

const mapStateToProps = (state) => ({
    auth: state.user.login,
    name: state.user.name,
    role: state.user.role
});
  
const mapDispatchTpProps = (dispatch) => ({
    Logout: () => dispatch(logout())
  });

 export default connect(mapStateToProps, mapDispatchTpProps)(Menu);

