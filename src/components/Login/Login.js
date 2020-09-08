import React, { useState } from 'react'
import { connect } from 'react-redux'
import {login} from '../../Redux/userActionCreators'
import LoadindScreen from '../LoadingScreen/LoadindScreen'
import './Login.css'
import { getErrors } from '../../Redux/selectors'


const Login = ({ errorMessage, loading, userLogin }) => {

  const [creden, setCreden] = useState({ username: '',password: '' });

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = creden;
    userLogin(username, password);
  };

  const handleChange = e => {
    const value = e.currentTarget.value;
    const fieldName = e.currentTarget.dataset.fieldName;

    setCreden({ 
      ...creden,
      [fieldName]: value
    })
  }

  if (loading) { 
    return <LoadindScreen isLoad={true}/>
  }
  
  const { username, password } = creden;

  return (    
    <div className="back">
      <div className='authPage'>
        <h5 className="card-title text-center">TO DO APP</h5>
        <form className="flex-form" onSubmit={handleSubmit}>
          <input required
            className="form-control"
            id="inputLogin"
            data-field-name={'username'}
            type={'text'}
            onChange={handleChange}
            placeholder={'Login'}
            value={username}
          />
                              
          <input required
            className="form-control"
            data-field-name={'password'}
            id="inputPassword"
            type={'password'}
            onChange={handleChange}
            placeholder={'Password'}
            value={password}
          />  
                    
          <div className="msg">
            {errorMessage ? <div style={{color:"red"}}>{errorMessage}</div> : null }
          </div>
          <hr className="my-4"></hr>
          <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase">Log in</button>
        </form>
      </div>
    </div>    
  )
}


const mapStateToProps = (state) => ({
  errorMessage: getErrors(state),
  loading: state.user.loading
});

const mapDispatchTpProps = (dispatch) => ({
  userLogin: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps,mapDispatchTpProps)(Login);