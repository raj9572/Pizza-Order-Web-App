import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsersOrders, deliverOrder } from '../../actions/orderAction'
import Loader from '../Loader'
import Error from '../Error'
import Table from 'react-bootstrap/Table';

const OrderList = () => {
  const dispatch = useDispatch()
  const allOrdersState = useSelector(state => state.allUsersOrdersReducer)
  const { loading, error, orders } = allOrdersState
  useEffect(() => {
    dispatch(allUsersOrders())
  }, [dispatch])
  return (
    <div>
      <h1>Order Lists</h1>
      {loading && <Loader />}
      {error && <Error error={"something went wronge"} />}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>orderId</th>
            <th>Email</th>
            <th>User Id</th>
            <th>Amount</th>
            <th>Date</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {
            orders?.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.transactionId}</td>
                <td>{order.orderAmount}/-</td>
                <td>{order.createdAt.substring(0,10)}/-</td>
                <td>{order.isDelivered ? (<h6 className='text-success'>Delivered</h6>) :(<><button onClick={()=>{dispatch(deliverOrder(order._id))}} className='btn-danger' >Delivered</button></>) }</td>
              </tr>
            ))
          }


        </tbody>
      </Table>
    </div>
  )
}

export default OrderList
