import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const PaySuccess = () => {

  useEffect(()=>{
     Swal.fire({
      title: "Thank you",
      text: "Payment Successfull",
      icon: "success"
    })
  },[])
  return (
    <>
    <div className='Payment-Message w-full flex justify-center items-center'>
       <h1 className='text-5xl hover:text-green-500'><Link to='/'>Go and Explore More</Link></h1>
    </div> 
    </>
  )
}

export default PaySuccess