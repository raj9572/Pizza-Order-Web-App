import axios from 'axios'
import Swal from 'sweetalert2'

export const getAllPizzas = () => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' })
    try {
        const res = await axios.get("/api/pizzas/getAllPizzas")
        // console.log('response',res)
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: res.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'GET_PIZZAS_FAIL', payload: error })
    }
}

export const addPizza = (pizza) => async (dispatch) => {
    dispatch({ type: 'ADD_PIZZAS_REQUEST' })
    try {
        const res = await axios.post("/api/pizzas/addpizza", { pizza })
        // console.log('response',res)
        dispatch({ type: 'ADD_PIZZAS_SUCCESS', payload: res.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'ADD_PIZZAS_FAIL', payload: error })
    }
}
export const getPizzaById = (pizzaId) => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_Id_REQUEST' })
    try {
        const res = await axios.post("/api/pizzas/getpizzabyid", { pizzaId })
        console.log('response', res)
        dispatch({ type: 'GET_PIZZAS_Id_SUCCESS', payload: res.data })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'GET_PIZZAS_Id_FAIL', payload: error })
    }
}
export const updatePizza = (updatedPizza) => async (dispatch) => {
    dispatch({ type: 'UPDATE_PIZZAS_Id_REQUEST' })
    try {
        const res = await axios.post("/api/pizzas/updatepizza", { updatedPizza })
        console.log('response', res)
        dispatch({ type: 'UPDATE_PIZZAS_Id_SUCCESS', payload: res.data })
        window.location.href = "/admin/pizzalist"
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'UPDATE_PIZZAS_Id_FAIL', payload: error })
    }
}
export const deletePizzabyId = (pizzaId) => async (dispatch) => {
    try {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
            const res = await axios.post("/api/pizzas/deletepizza", { pizzaId })
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              window.location.href="/admin/pizzalist"
            }
          })
        
      
    } catch (error) {
        console.log('Error', error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while deleting pizza!',
        })
    }
}

export const filterPizza = (searchKey,category) => async (dispatch) => {
    dispatch({ type: 'GET_PIZZAS_REQUEST' })
    try {
        let filterPizza ;
        const res = await axios.get("/api/pizzas/getAllPizzas")
       filterPizza = res.data.filter(pizza => pizza.name.toLowerCase().includes(searchKey))
       if(category !== "all"){
         filterPizza = filterPizza.filter(pizza => pizza.category === category)
       }
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: filterPizza })
    } catch (error) {
        console.log('Error', error)
        dispatch({ type: 'GET_PIZZAS_FAIL', payload: error })
    }
}