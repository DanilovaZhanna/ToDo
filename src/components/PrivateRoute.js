import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        (rest.role === 'admin') ? (
          <Component {...props} />
        ) : (
          <h1>Недостаточно прав</h1>
        )
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    role: state.user.role
  }
}

export default connect(mapStateToProps)(PrivateRoute)