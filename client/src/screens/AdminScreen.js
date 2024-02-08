import React, { useEffect } from 'react'
import { Row, Col, Container, Button, ButtonGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminScreen = () => {
    const navigate = useNavigate()
    const currentUser = useSelector(state=> state.loginUserReducer.currentUser)

    useEffect(()=>{
        if(localStorage.getItem("currentUser") === null || !currentUser.isAdmin){
            window.location.href="/"
        }
    },[])
    return (
        <>
            <Container>
                <Row>
                    <h1 className='text-center bg-dark  text-light'>Admin Panel</h1>
                    <Col md={2}>
                        <ButtonGroup vertical style={{ minHeight: "400px" }}>
                            <Button onClick={() =>navigate("/admin/userlist")} className='mb-2'>All Users</Button>
                            <Button onClick={() => navigate("/admin/pizzalist")} className='mb-2'>All Pizzaas</Button>
                            <Button onClick={() => navigate("/admin/addnewpizza")} className='mb-2'>Add New Pizza</Button>
                            <Button onClick={() => navigate("/admin/orderlist")} className='mb-2'>All Orders</Button>

                        </ButtonGroup>
                    </Col>
                    <Col md={10}>

                        <Outlet/>

                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AdminScreen
