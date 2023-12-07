import React, { useState } from 'react'

const About = () => {
  const [Readmore,setReadmore] = useState(false)
  return (
    <>
        <div className='flex justify-start items-center flex-col p-7 '>
            <div className='About_Us flex  w-4/5 gap-5'>
            <div className='AboutImg w-full'>
                <img className='opacity-60' src='./Images/AboutImg.png' alt='khan' />
            </div>
            <div className='w-full'>
            <h1 className='text-3xl opacity-80  inline-block pb-1 font-extrabold'><span className='border-b border-green-500'>Who We Are</span>...</h1>
            <p className='text-base opacity-50 my-2 text-green-100 '>
            Our journey began with a simple idea: to create a 
            space where individuals could effortlessly discover and 
            acquire products that elevate their lifestyles. At Shopies, 
            we pride ourselves on curating a diverse and exceptional 
            collection that reflects the ever-evolving needs and desires of our customers.
            {Readmore?"Join us on this exciting journey as we continue to evolve and grow. Shopies is not just a marketplace; it's a community of like-minded individuals who appreciate the finer things in life. Thank you for being a part of our story,and we look forward to serving you with excellence at every step." : null}</p>
            <button className='bg-green-500 rounded-md px-3 py-2 ' onClick={()=>setReadmore((prev)=>!prev)}>{Readmore?"Hide":"Read More"}</button>
            </div>
            </div>
        </div>
    </>
  )
}

export default About