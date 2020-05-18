import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Todolist  from './components/TodoList/Todolist';
import { connect } from 'react-redux'
import Users from './components/Users/Users'
import LoadindScreen from './components/LoadingScreen/LoadindScreen';
import PrivateRoute from './components/PrivateRoute';


const Pages = ({ loading}) => {
    return (
    <div className='pages'>        
        <LoadindScreen isLoad={loading}/>  
        <Switch>           
            <Route exact path="/"><h1>This is homepage</h1></Route>
            <Route path="/todos" component={Todolist} /> 
            <PrivateRoute path="/users" component={Users} />   
            <Route path="/logout"  />             
            <Redirect to="/"/>
        </Switch>
    </div>    
    )
}


const mapStateToProps = (state) => ({
    loading: state.user.loading
  });

export default connect(mapStateToProps,null)(Pages);

