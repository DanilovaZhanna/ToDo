import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { loadUsers } from '../../Redux/userActionCreators' 
import { TURN_OFF_LOADING_USER } from '../../Redux/userSlice'

const Users = ({users, loading, getUsers, offLoad}) => {
    
    useEffect(() => {
        getUsers()
        return function cleanUp() {
            offLoad()
        }}, [getUsers, offLoad])

    return (
        !loading ? (<div>
            <h2>List users</h2>
            <ul>
                {users.map((el, ind) => {return (<li key={ind}>{el.name}</li>)})}
            </ul>
        </div>) : null 
    )
}

function mapStateToProps(state) {
    return ({
        users: state.user.users,
        loading: state.user.loading
    })
}

function mapDispatchTpProps(dispatch) {
    return ({
        getUsers: () => dispatch(loadUsers()),
        offLoad: () => dispatch(TURN_OFF_LOADING_USER())
    })
} 

export default connect(mapStateToProps, mapDispatchTpProps)(Users)