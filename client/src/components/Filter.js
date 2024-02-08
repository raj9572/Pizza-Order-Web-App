import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import { filterPizza } from '../actions/pizzaAction';

const Filter = () => {
    const dispatch = useDispatch()
    const [searchKey, setSearchKey] = useState('')
    const [category, setCategory] = useState('all')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('se', searchKey)
        console.log('cate', category)
    }
    return (
        <div className='p-2 mt-2 bg-info'>
            <Form>
                <Row>
                    <Col>
                        <Form.Control value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='Enter name' />
                    </Col>
                    <Col>
                        <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                            <option value="all" >All</option>
                            <option value="veg" >veg</option>
                            <option value="nonveg" >nonveg</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button onClick={()=>dispatch(filterPizza(searchKey,category))} variant="primary" type="submit">
                            search
                        </Button>
                    </Col>
                </Row>


            </Form>
        </div>
    )
}

export default Filter
