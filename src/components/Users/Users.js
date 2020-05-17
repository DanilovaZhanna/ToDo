import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { loadUsers, offLoad } from '../../Redux/userActionCreators' 

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
        offLoad: () => dispatch(offLoad())
    })
} 

export default connect(mapStateToProps, mapDispatchTpProps)(Users)