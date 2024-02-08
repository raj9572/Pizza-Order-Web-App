import axios from "axios"
import Swal from "sweetalert2"

export const registerUser = (user) => async (dispatch) => {

    dispatch({ type: "USER_REGISTER_REQUEST" })
    try {
         await axios.post('/api/user/register', user)
        dispatch({type:"USER_REGISTER_SUCCESS"})
    } catch (error) {
        dispatch({type:"USER_REGISTER_FAIL",payload:error})
    }
}


export const loginUser = (user)=> async(dispatch) =>{
    dispatch({type:"USER_LOGIN_REQUEST"})
    try {
        const response = await axios.post('/api/user/login',user)
        dispatch({type:"USER_LOGIN_SUCCESS",payload:response.data})
        localStorage.setItem("currentUser",JSON.stringify(response.data))
        window.location.href='/'
    } catch (error) {
        dispatch({type:"USER_LOGIN_FAIL",payload:error})
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: 'GET_USERS_REQUEST' })
    try {
        const res = await axios.get("/api/user/getallusers")
        // console.log('response',res)
        dispatch({ type: 'GET_USERS_SUCCESS', payload: res.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'GET_USERS_FAIL', payload: error })
    }
}


export const deleteUser = (userId) => async (dispatch) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "you want to delete this user",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
            const res = await axios.post("/api/user/deleteuser", { userId })
              Swal.fire(
                'Deleted!',
                'user is deleted succfully.',
                'success'
              )
              window.location.href="/admin/userlist"
            }
          })
        
      
    } catch (error) {
        console.log('Error', error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while deleting user!',
        })
    }
}


export const logoutUser = ()=>(dispatch)=>{
    localStorage.removeItem("currentUser")
    window.location.href = "/login"
}