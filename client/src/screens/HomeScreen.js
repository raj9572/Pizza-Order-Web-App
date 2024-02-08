import React, { useEffect } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import Pizza from '../components/Pizza'
import {useDispatch,useSelector} from 'react-redux'
import { getAllPizzas } from '../actions/pizzaAction'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Filter from '../components/Filter'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const pizzaState = useSelector(state => state.getAllPizzaReducer)
  const {loading, pizzas, error} = pizzaState
  
  useEffect(()=>{
    dispatch(getAllPizzas())
  },[dispatch])

  return (
    <>
      <Container>
        {loading ? (<Loader/>) : error ? (<Error error={error}/>) : 
        <Row >
          <Filter/>
            {pizzas?.map(pizza=>(
                <Col key={pizza._id} md={4} >
                    <Pizza pizza={pizza}/>
                </Col>
            ))}            
        </Row>
        }
      </Container>
    </>
  )
}

export default HomeScreen
