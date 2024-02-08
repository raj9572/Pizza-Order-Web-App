import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form } from 'react-bootstrap'
import { registerUser } from '../actions/userAction'
import Loader from '../components/Loader'
import Success from '../components/Success'
import Error from '../components/Error'

const Register = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conformPassword, setConformPassword] = useState('')
    
    const registerState = useSelector(state => state.registerUserReducer)
    const {success,loading,error} = registerState
    
    
    const handleRegister = (e) => {
        e.preventDefault()
        if (password !== conformPassword) {
            alert("password don not match")
        }
        else {
            const user = { name, email, password, conformPassword }
            dispatch(registerUser(user))
            setName("")
            setEmail("")
            setPassword("")
            setConformPassword("")
        }
    }

  

    return (
        <>
            <Container>
                {loading && <Loader/>}
                {success && <Success success="user register successfully"/>}
                {error && <Error error="something went wronge" />}
                <Form>
                    <h1>Registration</h1>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name='name' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConformPassword">
                        <Form.Label>Conform Password</Form.Label>
                        <Form.Control name='conformPassword' value={conformPassword} onChange={(e) => setConformPassword(e.target.value)} type="password" placeholder="Password" />
                    </Form.Group>

                    <Button onClick={handleRegister} variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Register
