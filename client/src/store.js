import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllPizzaReducer,addPizzaReducer,getPizzaByIdReducer,updatedPizzaReducer } from './reducers/pizzaReducer'
import { placeOrderReducer,getUserOrdersReducer,allUsersOrdersReducer } from './reducers/orderReducer'
import { registerUserReducer, loginUserReducer,getAllUsersReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'


const cartItem = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []


const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : null

const rootReducer = combineReducers({
    getAllPizzaReducer,
    cartReducer,
    registerUserReducer,
    loginUserReducer,
    placeOrderReducer,
    getUserOrdersReducer,
    addPizzaReducer,
    getPizzaByIdReducer,
    updatedPizzaReducer,
    allUsersOrdersReducer,
    getAllUsersReducer
    
    

})


const initialState = {
    cartReducer: {
        cartItems: cartItem
    },
   loginUserReducer:{
    currentUser:currentUser
   }
}

const middleware = [thunk]

const store = legacy_createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

