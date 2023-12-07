import React from 'react'
import { FaStar,FaStarHalfAlt } from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'

const Rating = ({rates}) => {
    const ratingstar = Array.from({length:5},(star,index)=>{
        let number = index+0.5;
        return (
            <span key={index}>
            {rates >= index+1?(
                <FaStar className='text-green-500'/>
            ):rates >= number?(
                <FaStarHalfAlt className='text-green-500'/>
            ):(
                <AiOutlineStar className='text-green-500 '/>
            )}
            </span>
        )
    })
  return (
    <div className='flex'>
        {ratingstar}
    </div>
  )
}

export default Rating