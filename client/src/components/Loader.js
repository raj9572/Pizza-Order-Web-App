import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='text-center mt-2'>
      <Spinner  animation="border" role="status" />
    
    </div>
  )
}

export default Loader
