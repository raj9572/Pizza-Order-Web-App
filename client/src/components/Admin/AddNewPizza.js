import React, { useState } from 'react'
import { Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { addPizza } from '../../actions/pizzaAction'
import Loader from '../Loader'
import Error from '../Error'
import Success from '../Success'

const AddNewPizza = () => {
    const [name, setName] = useState('')
    const [smallPrice, setsmallPrice] = useState('')
    const [largePrice, setlargePrice] = useState('')
    const [mediumPrice, setmediumPrice] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')

    const addPizzaState = useSelector(state => state.addPizzaReducer)
    const {loading,error,success,pizzas} = addPizzaState
    const dispatch = useDispatch()


    const submitForm = (e) => {
        e.preventDefault()
        const pizza = {
            name,image,description,category,
            prices:{
                small:smallPrice,
                medium:mediumPrice,
                large:largePrice
            }
        }
        dispatch(addPizza(pizza))
    }

    return (
        <div>
            {loading && <Loader/>}
            {error && <Error error={error}/>}
            {success && <Success success="Pizza added successfully"/>}

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
                    Add New
                </Button>
            </Form>
        </div>

    )
}

export default AddNewPizza
