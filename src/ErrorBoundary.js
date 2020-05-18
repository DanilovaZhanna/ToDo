import React from 'react';
import { connect } from 'react-redux';

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
        if (this.state.hasError || this.props.error === '500') {
          // You can render any custom fallback UI
          return <h1>
              Ошибка{this.props.error === '500' && ' 500'}. Пожалуйста, обновите страницу
              {this.state.hasError.message}
          </h1>;
        }    
        return this.props.children; 
      }
}

const mapStateToProps = (state) => ({
    error: state.app.error
})

export default connect(mapStateToProps, null)(ErrorBoundary)