import React, { useState, useEffect, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { add, edit } from '../../Redux/taskActionCreators'
import { RESET_MODAL } from '../../Redux/taskSlice'
import ReactDOM from 'react-dom'
import "./Modal.css"
import LoadingScreen from '../LoadingScreen/LoadindScreen';
import { getTodo, getErrors } from '../../Redux/selectors';

// модальное окно с помощью портала
// туда будет рендериться портал
const modalRoot = document.getElementById('modal-root');

const Modal = ({isAdd, todo, taskAdd, id, canClose, onClose, resetModal, loading, errorMessage}) => {

  const [info, setInfo] = useState({title: '', description: ''})
  const root = useMemo(()=>document.createElement('div'),[]);
  
  useEffect( () => {
    modalRoot.appendChild(root)
    if (!isAdd) {
      const { title, description } = todo(id);
      setInfo({title, description});
      return function cleanUp() {
        modalRoot.removeChild(root);  
      }
    }}, [id, root, todo, isAdd ]); 

  useEffect( () => {
    if (canClose) { 
      onClose();    
      resetModal();      
    }  
  },[canClose, onClose, resetModal]); 

  const handleSubmit = e => {
    e.preventDefault()
    isAdd ?
      taskAdd(title, description) : this.props.taskEdit(id, title, description)
  }

  const handleChange = e => {
    const value = e.currentTarget.value
    const fieldName = e.currentTarget.dataset.fieldName
    setInfo({ ...info,
      [fieldName]: value,
    })
  }
  
  const { title, description } = info;

  return ReactDOM.createPortal(
      <div className="modal-wrapper">          
        <div className='auth'> 
            {!loading ? (<>{isAdd ? (<h5>ADD TASK</h5>) : (<h5>CHANGE TASK</h5>)}
            <form className="flex-form" onSubmit={handleSubmit}>
              <input required
                className="form-control my-input"
                id="inputName"
                data-field-name={'title'}
                type={'text'}
                onChange={handleChange}
                placeholder={'Title'}
                value={title}/>
                                  
              <input required
                className="form-control my-input"
                data-field-name={'description'}
                id="inputPassword"
                type={'text'}
                onChange={handleChange}
                placeholder={'Description'}
                value={description}
              />  
                        
              <div className="msg">
              {errorMessage ? <div className="errorM">{errorMessage}</div>: null }
              </div>
              <div className='btns'>  
                  <button type="submit" className="btn btn-add">{isAdd ? `ADD` : `CHANGE`}</button>
                  <button className="btn btn-add" onClick={() => onClose()}>CANCEL</button>
              </div>
            </form></>) : <LoadingScreen isLoad/>}
        </div>
        ) 
      </div>, root      
    )
}



const mapStateToProps = (state) => ({
    todo: (id) => getTodo(id)(state),
    loading: state.task.loading,
    canClose: state.task.canClose,
    errorMessage: getErrors(state)
});

const mapDispatchTpProps = (dispatch) => ({
  taskAdd: (title, description) => dispatch(add(title, description)),
  taskEdit: (id, title, description) => dispatch(edit(id, title, description)),
  resetModal: () => dispatch(RESET_MODAL())
});

export default connect(mapStateToProps,mapDispatchTpProps)(withRouter(Modal));
