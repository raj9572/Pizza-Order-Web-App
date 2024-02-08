import React from 'react'
import {  Nav, Navbar,Container } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {BiSolidOffer} from 'react-icons/bi'
const TopBar = () => {
  return (
   <>
      <Navbar bg="dark" variant='dark' expand="lg">
         <Container fluid>
                <h6 className='text-light'>
                    <BiSolidOffer className='text-warning fs-3'/> $nbsp;
                    Free-Home Delivery on Order About 500/-Rupees
                </h6>
                <Nav className='ms-auto'>
                    <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                        <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contact">
                        <Nav.Link>ContactUs</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/policy">
                        <Nav.Link>term and policy</Nav.Link>
                    </LinkContainer>
                   
                </Nav>
         </Container>
      </Navbar>
   </>
  )
}

export default TopBar
