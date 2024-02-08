import React from 'react'
import { Button } from 'react-bootstrap';
// import StripeCheckout from 'react-stripe-checkout';
// import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Checkout = ({ cartItems }) => {
    const user = useSelector(state => state.loginUserReducer.currentUser)
    const handleCheckout = async()=>{
        try {
            const res = await axios.post("api/orders/placeorder",{
                products:cartItems,
                user : user
            })
    
           if(res.data.url){
            window.location.href=res.data.url
           }
        } catch (error) {
            console.log('error',error)
        }
    }   

     return (
        <Button onClick={handleCheckout} className='btn-warning'>CheckOut</Button>
    )
}

export default Checkout
