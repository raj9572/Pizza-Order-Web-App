import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../../actions/userAction'
import Loader from '../Loader'
import Error from '../Error'
import Table from 'react-bootstrap/Table';
import { AiFillDelete } from 'react-icons/ai'

const UserList = () => {
  const dispatch = useDispatch()
  const allUserState = useSelector(state => state.getAllUsersReducer)
  const { loading, error, users } = allUserState
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  return (
    <div>
      <h1 className='text-center'>userList</h1>
      {loading && <Loader />}
      {error && <Error error={error.message} />}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><AiFillDelete
                onClick={() => {dispatch(deleteUser(user._id))}}
                style={{ color: "red", cursor: "pointer", }} /></td>
             <td>{user.isAdmin ? (<><button  className='btn-primary' >remove Admin</button></>) :(<><button  className='btn-primary' >make Admin</button></>) }</td>
            </tr>
          ))}


        </tbody>
      </Table>
    </div>
  )
}

export default UserList
