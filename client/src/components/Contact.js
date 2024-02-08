import React from 'react'
import { Container, Row, Col, Table, Image } from 'react-bootstrap'
import {FiPhoneCall} from 'react-icons/fi'
import {ImMobile} from 'react-icons/im'
import {FaRegEnvelope} from 'react-icons/fa'

const Contact = () => {
    return (
        <>
            <Container style={{ marginTop: "50px" }}>
                <Row>
                    <Col md={6}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam nesciunt explicabo a in quia sint harum eveniet ipsum ex praesentium rem neque repellendus, tempora voluptas nisi aut expedita earum blanditiis consequuntur autem? Iusto quis, minus expedita ex aliquam minima ad nostrum animi laboriosam? Odio molestias laborum voluptate nemo consequuntur ducimus porro minima quod dolores, obcaecati reprehenderit hic velit dolorem! Nisi facilis neque asperiores eum vero hic unde eius itaque nam officiis. Harum quaerat cumque sequi. Minima reiciendis maiores, autem accusantium suscipit iste similique in porro quis architecto quod illum molestias, magnam beatae ratione voluptates consequuntur enim facere quasi maxime! Numquam temporibus sequi qui ab ex, sed id, placeat, sint aspernatur nesciunt minima fugit quam rerum enim delectus quasi iusto. Pariatur nostrum reiciendis repellat officia. Odio, id. Praesentium nostrum sunt, sapiente corrupti est perferendis quaerat magni adipisci fugit officiis odit nesciunt a, alias distinctio. Iste adipisci perferendis odit voluptatum natus quam nostrum libero? Laboriosam, minus! Officia necessitatibus ut rerum aspernatur quo fuga nam, adipisci itaque, ab in, dignissimos fugit quod harum neque voluptate illo. Consectetur, tempore veniam quasi dignissimos autem dolore molestias adipisci, optio possimus reprehenderit, aspernatur incidunt ipsam molestiae. Quo exercitationem veritatis incidunt voluptatibus ducimus dolores quam. Consectetur, doloribus in.</p>
                        <Table className='text-center' striped bordered hover>
                        <thead>
                            <tr>
                                <th className='bg-warning text-center' colSpan={3}>---Contact details ---</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><FiPhoneCall/></td>
                                <td>phone</td>
                                <td>0123-45689</td>
                            </tr>
                            <tr>
                                <td><ImMobile/></td>
                                <td>phone</td>
                                <td>0123-45689</td>
                            </tr>
                            <tr>
                                <td><FaRegEnvelope/></td>
                                <td>Email</td>
                                <td>rajali1432@gmail.com</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    </Col>
                    <Col md={6}>
                      <Image src='images/farmhouse.jpg' style={{width:"100%",height:"100%"}}/>
                    </Col>
                   
                </Row>
            </Container>
        </>
    )
}

export default Contact
