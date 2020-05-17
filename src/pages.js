import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Todolist  from './components/TodoList/Todolist';
import { connect } from 'react-redux'
import Users from './components/Users/Users'
import LoadindScreen from './components/LoadingScreen/LoadindScreen';

// rкуда впихнуть эту мразь 
const Pages = ({ loading}) => {
    return (
    <div className='pages'>        
        <LoadindScreen isLoad={loading}/>  
        <Switch>           
            <Route exact path="/" />
            <Route path="/todos" component={Todolist} /> 
            <Route path="/users" component={Users} />           
            <Redirect to="/"/>
        </Switch>
    </div>    
    )
}


const mapStateToProps = (state) => ({
    loading: state.user.loading
  });

export default connect(mapStateToProps,null)(Pages);

