import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {me} from './Redux/userActionCreators'
import Menu from './components/Menu/Menu'
import Pages from './pages'

import "./App.css"
import LoadindScreen from './components/LoadingScreen/LoadindScreen';

const App = ({loading, meUser})=>{ 
    
  useEffect ( () => meUser(), [])

// switch в отд комп
    return (         
        <BrowserRouter>
        <div className="App">   
          <Menu />
          <LoadindScreen isLoad={loading}/>  
          <Pages />           
        </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => ({
  loading: state.user.loading
});

const mapDispatchTpProps = (dispatch) => ({
  meUser: () => dispatch(me())
});


export default connect(mapStateToProps,mapDispatchTpProps)(App);
