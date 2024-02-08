import React from 'react'
import {Container,Row,Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {FaMinusCircle, FaPlusCircle, FaTrash} from 'react-icons/fa'
import { addToCart,deleteFromCart } from '../actions/cartAction'
import Checkout from '../components/CheckOut'

const CartScreen = () => {
    const dispatch = useDispatch()
    const cartState = useSelector(state => state.cartReducer)
    const cartItems = cartState.cartItems
    const subTotal = cartItems.reduce((x,item) => x + item.price,0)
   
  return (
    <>
       <Container>
         <Row>
            <Col md={6}>
                <h1>My Cart</h1>
                <Row>
                    {
                        cartItems.map(item => (
                            <div  key={item._id}>
                            <Col md={7}>
                                 <h5>{item.name} [{item.varient}]</h5>
                                 <h6> Price : {item.quantity} * {item.prices[0][item.varient]} = {item.price}</h6>
                                 <h6>Quanity : <FaMinusCircle onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.varient))}} style={{cursor:"pointer"}}  className='text-danger me-2'/> {item.quantity} <FaPlusCircle onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.varient))}} style={{cursor:"pointer"}} className='text-success  ms-2'/> </h6>
                                
                            </Col>
                            <Col md={5}>
                                <img src={item.image} alt={item.name} style={{width:"80px",height:"80px"}}/>
                                <FaTrash onClick={()=> dispatch(deleteFromCart(item))} className='text-danger fs-3 ms-2' style={{cursor:"pointer"}}/>
                                 </Col>
                                 <hr />
                            </div>
                            
                        ))
                    }
                   
                </Row>
            </Col>
            <Col md={4}>
                <h1>Payment info</h1>
                <h4>Sub Total</h4>
                <h4>{subTotal}/-RS</h4>
                <Checkout cartItems={cartItems}/>
            </Col>
         </Row>
       </Container>
    </>
  )
}

export default CartScreen
