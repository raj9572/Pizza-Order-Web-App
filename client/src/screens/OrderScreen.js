import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getUserOrders } from '../actions/orderAction'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Col, Row } from 'react-bootstrap'

const OrderScreen = () => {
    const dispatch = useDispatch()
    const orderState = useSelector(state => state.getUserOrdersReducer)
    const {loading,error,orders} = orderState
    useEffect(()=>{
        dispatch(getUserOrders())
    },[dispatch])


  return (
    <>
       <h1 className='text-center my-3'>order screen</h1>
       {loading && <Loader/>}
       {error && <Error error={error.message}/>}
       {
        orders?.map(order =>(
            <div className='container border p-4 bg-light'>
                <Row>
                <Col md={4}>
                   <div className='container ms-2'>
                   {order.orderItems.map(item=>(
                        <h6>{item.name} [{item.varient}] * {item.quantity} = {" "}
                        {item.price}
                        </h6>
                    ))}
                   </div>
                </Col>
                <Col md={4}>
                    <h4>Address</h4>
                    <h6>Street:{order.shippingAddress.street}</h6>
                    <h6>City:{order.shippingAddress.city}</h6>
                    <h6>Pincode:{order.shippingAddress.pincode}</h6>
                    <h6>customer_Phone_no:{order.customerDetails.phone}</h6>
                    <h6>Country:{order.shippingAddress.country}</h6>
                </Col>
                <Col md={4}>
                    <h4>Order Info</h4>
                    <h6>OrderAmount : {order.orderAmount}</h6>
                    <h6>transactionId : {order.transactionId}</h6>
                    <h6>orderId : {order._id}</h6>
                </Col>
            </Row>
            </div>
            
        ))
       }

    </>
  )
}

export default OrderScreen
