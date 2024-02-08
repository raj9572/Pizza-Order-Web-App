import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deletePizzabyId, getAllPizzas } from '../../actions/pizzaAction'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import Loader from '../Loader'
import Error from '../Error'
import Pizza from '../Pizza'
import { Link } from 'react-router-dom'
const PizzasList = () => {
    const dispatch = useDispatch()
    const pizzaState = useSelector(state => state.getAllPizzaReducer)
    const { loading, pizzas, error } = pizzaState

    useEffect(() => {
        dispatch(getAllPizzas())
    }, [dispatch])
    return (
        <>
            <Container>
                {loading ? (<Loader />) : error ? (<Error error={error} />) :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>s/n</th>
                                <th>Pizza Name</th>
                                <th>Prices</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pizzas?.map(pizza => (
                                    <tr key={pizza._id}>
                                        <td><img src={pizza.image} alt='logo' width={"100px"} height={"100px"}/></td>
                                        <td>{pizza.name}</td>
                                        <td>
                                        Small : {pizza.prices[0]["small"]}
                                         <br/>
                                        Medium : {pizza.prices[0]["medium"]}
                                         <br/>
                                        Large : {pizza.prices[0]["large"]}
                                         </td>
                                        <td>{pizza.category}</td>
                                        <td>
                                            <Link to={`/admin/editpizza/${pizza._id}`}>
                                            <AiFillEdit style={{cursor:"pointer"}} /> 
                                            </Link>
                                             &nbsp; 
                                            <AiFillDelete 
                                            onClick={()=>{dispatch(deletePizzabyId(pizza._id))}}
                                            style={{color:"red",cursor:"pointer"}} />
                                           

                                        </td>
                                    </tr>
                                ))
                            }



                        </tbody>
                    </Table>
                }
            </Container>
        </>
    )
}

export default PizzasList
