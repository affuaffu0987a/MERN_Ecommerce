import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='Error-page'>
         <h1 className='text-8xl'>404 Not Found</h1>
        <Link to='/'><p className=' font-bold underline hover:text-green-400'>Go to Home</p></Link>
    </div>
  )
}

export default Error