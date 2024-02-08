import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../actions/userAction'

const Login = () => {
  const dispatch = useDispatch()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  useEffect(()=>{
    if(localStorage.getItem("currentUser")){
      window.location.href="/"
    }
  },[])


  const handleLogin = (e)=>{
    e.preventDefault()
    const user = {email,password}
    dispatch(loginUser(user))
     
  }

  return (
    <>
    <Container>
     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control name='email' value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
      </Form.Group>
      <Button onClick={handleLogin} variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </Container>
    </>
  )
}

export default Login
