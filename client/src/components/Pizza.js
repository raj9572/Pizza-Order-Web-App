import React, { useState } from 'react'
import { Button, Card, Row, Col, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartAction'

const Pizza = ({ pizza }) => {
    const dispatch = useDispatch()
    const [varient, setVarient] = useState('small')
    const [quantity, setQuantity] = useState(1)
    const [show, setShow] = useState(false);

    const addToCartHandler = ()=>{
        dispatch(addToCart(pizza,quantity,varient))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            <Card style={{ width: '18rem', marginTop: "20px" }}>
                <Card.Img
                    onClick={handleShow}
                    variant="top"
                    src={pizza.image}
                    style={{ height: "150px", cursor: "pointer" }}
                />
                <Card.Body>
                    <Card.Title>{pizza.name}</Card.Title>
                    <hr />
                    <Card.Text>
                        <Row>
                            <Col md={6}>
                                <h6>Varient</h6>
                                <select value={varient} onChange={(e) => { setVarient(e.target.value) }}>
                                    {pizza.varients.map((varient, index) => (
                                        <option key={index} value={varient} >{varient}</option>
                                    ))}
                                </select>
                            </Col>
                            <Col md={6}>
                                <h6>Quantity</h6>
                                <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                    {[...Array(10).keys()].map((v, i) => (
                                        <option key={i} value={i + 1} >{i + 1}</option>
                                    ))}
                                </select>
                            </Col>

                        </Row>
                    </Card.Text>
                    <Row>
                        <Col md={6}>Price : {pizza.prices[0][varient] * quantity}</Col>
                        <Col md={6}>
                            <Button onClick={addToCartHandler} className='bg-warning text-white'>Add Card</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <Card.Img
                    onClick={handleShow}
                    variant="top"
                    src={pizza.image}
                    style={{ height: "150px" }}
                />
                    </div>
                    <div>
                        <h5>description : </h5>
                        <h6>{pizza.description}</h6>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default Pizza
