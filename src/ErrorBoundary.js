import React from 'react';
import { connect } from 'react-redux';
import { getErrors } from './Redux/selectors';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
        
      }
      
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
    
      componentDidCatch(error, errorInfo) {
          this.setState({hasError:true});
      }
    
      render() {
        if (this.state.hasError) {
          return <h1>
              Ошибка. Пожалуйста, обновите страницу
              {this.state.hasError.message}
          </h1>;
        }    
        return this.props.children; 
      }
}

const mapStateToProps = (state) => ({
    error: getErrors(state)
})

export default connect(mapStateToProps, null)(ErrorBoundary)