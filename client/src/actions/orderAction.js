import axios from 'axios'
import Swal from 'sweetalert2'

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: "PLACE_ORDER_REQUEST" })
    const currentUser = getState().loginUserReducer.currentUser
    const cartItems = getState().cartReducer.cartItems
    try {
        const res = await axios.post('/api/orders/placeorder', { token, subtotal, currentUser, cartItems })
        dispatch({ type: "PLACE_ORDER_SUCCESS" })
        console.log('res', res)
    } catch (error) {
        dispatch({ type: "PLACE_ORDER_FAIL" })
        console.log('error', error)
    }

}


export const getUserOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({
        type: "USER_ORDER_REQUEST"
    })

    try {
        const res = await axios.post('/api/orders/getuserorder', { userId: currentUser._id })
        dispatch({
            type: "USER_ORDER_SUCCESS",
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: "USER_ORDER_FAIL",
            payload: error
        })
    }

}



export const allUsersOrders = () => async (dispatch, getState) => {

    dispatch({
        type: "ALL_ORDER_REQUEST"
    })

    try {
        const res = await axios.get('/api/orders/allusersorders',)
        dispatch({
            type: "ALL_ORDER_SUCCESS",
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: "ALL_ORDER_FAIL",
            payload: error
        })
    }

}


export const deliverOrder = (orderId) => async (dispatch, getState) => {

    dispatch({
        type: "GET_ALL_ORDER_REQUEST"
    })

    try {
        const res = await axios.post('/api/orders/deliverorder', { orderId })
        Swal.fire(
            'Success!',
            'Your order is delivered.',
            'success'
        )
        const orders = await axios.get('/api/orders/allusersorders',)
        dispatch({
            type: "GET_ALL_ORDER_SUCCESS",
            payload: orders.data
        })
        window.location.href = "/admin/orderlist"
    } catch (error) {
        dispatch({
            type: "GET_ALL_ORDER_FAIL",
            payload: error
        })
    }

}
