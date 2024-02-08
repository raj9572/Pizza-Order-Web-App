import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPizzaById, updatePizza } from '../../actions/pizzaAction'
import { useParams } from 'react-router-dom'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { addPizza } from '../../actions/pizzaAction'
import Loader from '../Loader'
import Error from '../Error'
import Success from '../Success'

const EditPizza = () => {
  const [name, setName] = useState('')
  const [smallPrice, setsmallPrice] = useState('')
  const [largePrice, setlargePrice] = useState('')
  const [mediumPrice, setmediumPrice] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const { pizzaId } = useParams()

  const pizzaState = useSelector(state => state.getPizzaByIdReducer)
  const updatePizzaState = useSelector(state => state.updatedPizzaReducer)
  const { loading, error, success, pizza } = pizzaState
  const { updateloading, updateerror, updatesuccess } = updatePizzaState

  const dispatch = useDispatch()
  useEffect(() => {
    if(pizza?._id === pizzaId){
      setName(pizza.name);
      setDescription(pizza.description);
      setCategory(pizza.category);
      setImage(pizza.image)
      setsmallPrice(pizza.prices[0]["small"])
      setmediumPrice(pizza.prices[0]["medium"])
      setlargePrice(pizza.prices[0]["large"])
    }else{
      dispatch(getPizzaById(pizzaId))
    }
    // setPizza()
  }, [dispatch, pizzaId,pizza])

  // const setPizza = () => {
  //   setName(pizza?.name)
  // }






  const submitForm = (e) => {
    e.preventDefault()
    const editedPizza = {
      name, image, description, category,
      _id:pizzaId,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice
      }
    }
    
    dispatch(updatePizza(editedPizza))
    
  }
  return (
    <div>
      {updateloading && <Loader />}
      {error && <Error error={error} />}
      <Form onSubmit={submitForm} className='bg-light p-4'>

        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>SmallPrice</Form.Label>
          <Form.Control value={smallPrice} onChange={(e) => setsmallPrice(e.target.value)} type="text" placeholder="small Price" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>mediumPrice</Form.Label>
          <Form.Control value={mediumPrice} onChange={(e) => setmediumPrice(e.target.value)} type="text" placeholder="Medium Price" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>largePrice</Form.Label>
          <Form.Control value={largePrice} onChange={(e) => setlargePrice(e.target.value)} type="text" placeholder="Large Price" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            placeholder="Add Image URL"
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>description</Form.Label>
          <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className='mb-3' controlId="formGridEmail">
          <Form.Label>category</Form.Label>
          <Form.Control value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Name" />
        </Form.Group>









        <Button variant="primary" type="submit">
           Update Pizza
        </Button>
      </Form>
    </div>
  )
}

export default EditPizza
