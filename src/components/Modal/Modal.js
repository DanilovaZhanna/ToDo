import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { add, edit, openModal } from '../../Redux/taskActionCreators'
import ReactDOM from 'react-dom'

import "./Modal.css"
import LoadingScreen from '../LoadingScreen/LoadindScreen';
import { getTodo } from '../../Redux/selectors';

const modalRoot = document.getElementById('modal-root');
// туда будет рендериться портал
class Modal extends React.Component {
  state = {
    title: '',
    description: '',
    root: document.createElement('div')
  }

    componentDidMount() {      
        modalRoot.appendChild(this.state.root)
        // если изменяем имеющийся то записываем в поля title descr
        if (!this.props.isAdd) {
            const { title, description } = this.props.todo(this.props.id)
            this.setState({title, description})
            }
    }

    componentDidUpdate() {
        if (this.props.canClose) { 
            this.props.onClose()    
            this.props.openModal()      
        }  
    }

    componentWillUnmount() { 
        modalRoot.removeChild(this.state.root);  
    }

  handleSubmit = e => {
    e.preventDefault()
    const { title, description} = this.state
    this.props.isAdd ?
        this.props.taskAdd(title, description) : this.props.taskEdit(this.props.id, title, description)
  }

  handleChange = e => {
    const value = e.currentTarget.value
    const fieldName = e.currentTarget.dataset.fieldName
    this.setState({
      [fieldName]: value,
    })
  }

  
  render() {    

    const { title, description } = this.state
    const { isAdd, loading } = this.props

    return ReactDOM.createPortal(
      <div className="modal-wrapper">          
        <div className='auth'> 
            {!loading ? (<>{isAdd ? (<h5>ADD TASK</h5>) : (<h5>CHANGE TASK</h5>)}
          <form className="flex-form" onSubmit={this.handleSubmit}>
            <input required
              className="form-control my-input"
              id="inputName"
              data-field-name={'title'}
              type={'text'}
              onChange={this.handleChange}
              placeholder={'Title'}
              value={title}
            />
                                
            <input required
              className="form-control my-input"
              data-field-name={'description'}
              id="inputPassword"
              type={'text'}
              onChange={this.handleChange}
              placeholder={'Description'}
              value={description}
            />  
                      
            <div className="msg">
            {this.props.errorMessage ? <div className="errorM">{this.props.errorMessage}</div>: null }
            </div>
            <div className='btns'>  
                <button type="submit" className="btn btn-add">{isAdd ? `ADD` : `CHANGE`}</button>
                <button className="btn btn-add" onClick={() => this.props.onClose()}>CANCEL</button>
            </div>
          </form></>) : <LoadingScreen isLoad={true}/>}
        </div>
        ) 
      </div>, this.state.root      
    )
  }
}


const mapStateToProps = (state) => ({
    todo: (id) => getTodo(id)(state),
    loading: state.task.loading,
    canClose: state.task.canClose,
    errorMessage: state.app.error
});

const mapDispatchTpProps = (dispatch) => ({
  taskAdd: (title, description) => dispatch(add(title, description)),
  taskEdit: (id, title, description) => dispatch(edit(id, title, description)),
  openModal: () => dispatch(openModal())
});

export default connect(mapStateToProps,mapDispatchTpProps)(withRouter(Modal));
