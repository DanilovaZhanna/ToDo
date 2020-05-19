import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen/LoadindScreen';
import { connect } from 'react-redux'
import {me} from './Redux/userActionCreators'
import Menu from './components/Menu/Menu'
import Login from './components/Login/Login.js'
import Pages from './pages'

import './fonts/style.css'
import "./App.css"

const App = ({ meUser, me, isAuth, loading })=>{ 
    
  useEffect ( () => meUser(), [meUser])
  
  // me - это выполнился ли /me или нет, если нет пока загрузка, если выполнился, то в зависимости 
  // от авторизован или нет показывается либо логин либо менюшка с тудушками
    return (         
        <BrowserRouter>
          <div className="App">   
            <Menu />             
            { me ? (isAuth ? <Pages /> : (   
                <Switch>                       
                  <Route path='/login' component={Login} />   
                  <Redirect to='/login' />
                </Switch> 
            )) : <LoadingScreen isLoad={loading}/>  }           
          </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
  me: state.user.me,
  loading: state.user.loading,
  isAuth: state.user.login
})

const mapDispatchTpProps = (dispatch) => ({
  meUser: () => dispatch(me())
});


export default connect(mapStateToProps,mapDispatchTpProps)(App);
