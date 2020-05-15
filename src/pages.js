import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './components/Login/Login.js';
import PrivateRoute from './components/PrivateRoute';
import Todolist  from './components/TodoList/Todolist';
import Modal from './components/Modal/Modal'

const Pages = () => {
    return (
    <div className='pages'>
        <Switch>
            <PrivateRoute exact path="/" component={Todolist} />
            <PrivateRoute path="/todos" component={Todolist} />
            <Route exact path="todos/change/:id" render={({match}) => <Modal isAdd={false} id={match.params.id}/> }/>
            <Route exact path="todos/add" render={() => <Modal isAdd={true}/> }/>        
            <Route path="/login" component={Login} />            
            <Redirect to="/notfound"/>
        </Switch>
    </div>    
    )
}

export default Pages