import React from 'react'

import "./LoadingScreen.css"

const LoadingScreen = ({ isLoad }) => {
    return (
        isLoad ? 
      (<div className="preloader">
        <div className="preloader__row">
          <div className="preloader__item"></div>
          <div className="preloader__item"></div>
        </div>
      </div>) : null
    )
}

export default LoadingScreen