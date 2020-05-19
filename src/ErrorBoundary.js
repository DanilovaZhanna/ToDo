import React from 'react';
import { connect } from 'react-redux';
import { getErrors } from './Redux/selectors';

class ErrorBoundary extends React.Component {
    // как отлавливать ошибки с сервера? на случай 500 ошибки я записываю в редакс "500" и тут сравниваю строку 
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
          return <h1>
              Ошибка{this.props.error === '500' && ' 500'}. Пожалуйста, обновите страницу
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