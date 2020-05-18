import React from 'react'
import { connect } from 'react-redux'
import {login} from '../../Redux/userActionCreators'
import LoadindScreen from '../LoadingScreen/LoadindScreen'
import './Login.css'
import { getErrors } from '../../Redux/selectors'


class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    console.log(username + ' ' + password)
    this.props.userLogin(username, password)
  }

  handleChange = e => {
    const value = e.currentTarget.value
    const fieldName = e.currentTarget.dataset.fieldName

    this.setState({
      [fieldName]: value,
    })
  }

  
  render() {    

    if (this.props.loading) { 
      return <LoadindScreen isLoad={true}/>
    }
    const { username, password } = this.state
  
    return (
      <div className="back">
        <div className='authPage'>
          <h5 className="card-title text-center">TO DO APP</h5>
          <form className="flex-form" onSubmit={this.handleSubmit}>
            <input required
              className="form-control"
              id="inputLogin"
              data-field-name={'username'}
              type={'text'}
              onChange={this.handleChange}
              placeholder={'Login'}
              value={username}
            />
                                
            <input required
              className="form-control"
              data-field-name={'password'}
              id="inputPassword"
              type={'password'}
              onChange={this.handleChange}
              placeholder={'Password'}
              value={password}
            />  
                     
            <div className="msg">
              {this.props.errorMessage ? <div style={{color:"red"}}>{this.props.errorMessage}</div> : null }
            </div>
            <hr className="my-4"></hr>
            <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase">Log in</button>
          </form>
        </div>
      </div>      
    )
  }
}


const mapStateToProps = (state) => ({
  errorMessage: getErrors(state),
  loading: state.user.loading
});

const mapDispatchTpProps = (dispatch) => ({
  userLogin: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps,mapDispatchTpProps)(Login);