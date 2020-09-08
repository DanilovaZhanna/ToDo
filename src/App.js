import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen/LoadindScreen';
import { connect } from 'react-redux'
import { me } from './Redux/userActionCreators'
import Login from './components/Login/Login.js'
import Pages from './pages'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './fonts/style.css'
import "./App.css"

const App = ({ meUser, me, isAuth, loading, error })=>{ 
  
  const notify = () => toast.dark('🦄 Ошибка сервера. Пожалуйста, обновите страницу', {
    position: "top-left",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    useEffect ( () => { 
      if (error === '500') {
        notify();
      }
    }, [error])

  useEffect ( () => meUser(), [meUser])
  
  // me - это выполнился ли /me или нет, если нет пока загрузка, если выполнился, то в зависимости 
  // от авторизован или нет показывается либо логин либо менюшка с тудушками
    return (         
        <BrowserRouter>
          <div className="App">             
            { me ? (isAuth ? <Pages /> : (   
                <>                     
                  <Route path='/login' component={Login} />   
                  <Redirect to='/login' />
                </> 
            )) : <LoadingScreen isLoad={loading}/>  }           
          </div> 
          <ToastContainer
              position="top-left"
              autoClose={15000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              />
          <ToastContainer />
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
  me: state.user.me,
  loading: state.user.loading,
  isAuth: state.user.login,
  error: state.app.error
})

const mapDispatchTpProps = (dispatch) => ({
  meUser: () => dispatch(me())
});


export default connect(mapStateToProps,mapDispatchTpProps)(App);
