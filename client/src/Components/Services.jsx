import React from 'react'

const Services = () => {
    return (
        <>
            <div className='services  flex justify-center  gap-6 py-12 px-12 opacity-50'>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f1.png' alt='services' />
                    <p className='bg-blue-200 px-1 mt-1 text-black font-bold'>Free Shipping</p>
                </div>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f2.png' alt='services' />
                    <p className='bg-purple-300 px-1 mt-1 text-black font-bold'>Online Order</p>
                </div>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f3.png' alt='services' />
                    <p className=' bg-green-200 px-1 mt-1 text-black font-bold'>Save Money</p>
                </div>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f4.png' alt='services' />
                    <p className='bg-blue-300 px-1 mt-1 text-black font-bold'>Promotions</p>
                </div>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f5.png' alt='services' />
                    <p className=' bg-purple-300 px-1 mt-1 text-black font-bold'>Happy sell</p>
                </div>
                <div className=' w-32  h-32 flex  justify-center items-center flex-col'>
                    <img src='./servicesImg/f6.png' alt='services' />
                    <p className=' bg-red-200 px-1 mt-1 text-black font-bold'>F24/7 Support</p>
                </div>
            </div>
        </>
    )
}

export default Services