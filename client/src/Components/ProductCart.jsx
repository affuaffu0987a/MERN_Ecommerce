import React, { useState } from 'react'
import { useGlobalContext } from '../Contextapi/Context'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCart = () => {
    const [Animation,setAnimation] = useState(false)
    const { ProductsApi, dispatch, isLoader,AllProductApi,DiscountPrices } = useGlobalContext()

    const AddCartItems =(Products,finalPrice)=>{
        toast.info('Added! 🛒', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        dispatch({
            type: "Add_TO_CART",
            payload: {
                Newprice:finalPrice,
                id: Products.id,
                Products:Products,
            }
        })
    }
    return (
        <>
        <div className='overflow-hidden'>
            <h1 className='text-2xl text-white font-extrabold opacity-80 mb-2 inline-block px-4 py-1'>Top Products :</h1>
            <div className={`ProductCard ${Animation?'amimation-stop':''} flex  gap-3 justify-center items-start`} onMouseEnter={()=>setAnimation(true)} onMouseLeave={()=>setAnimation(false)} >
                {isLoader ? <Loader /> : null}
                {ProductsApi?.map((Products) => {
                    let description = Products.description.slice(0, 15)
                    let title = Products.title.slice(0, 19)
                    let finalPrice = DiscountPrices(Products);
                    return (
                        <div key={Products.id} className='CartDetails relative flex flex-col  cursor-pointer '>
                            <Link to={`/${Products.id}`}> <img className="w-full h-52  object-fill" src={Products.thumbnail} alt='Products' />
                                <div className='card-content flex flex-col justify-center items-start p-3'>
                                    <p className='absolute top-0 left-0 bg-green-500 p-1'>{Products.brand}</p>
                                    <h2 className=''>{title}...</h2>
                                    <p className='opacity-50 text-sm'>{description}...</p>
                                    <div className='flex justify-between items-center w-full mt-1'>
                                        <p className=''><span className='line-through  opacity-60'>${Products.price}</span> ${finalPrice}</p>
                                    </div>
                                </div>
                            </Link>
                            <button className='bg-green-500  w-16 rounded-full absolute bottom-4 right-2' onClick={() =>AddCartItems(Products,finalPrice)}>Add</button>
                        </div>
                    )
                })}
             <ToastContainer/>
            </div>
            <div className='w-full flex justify-end items-center px-5 py-2'>
            <button className='bg-green-500 m-2 py-2 px-4 text-xl'
            onClick={()=>AllProductApi}
            ><Link to='/products'>View All</Link></button>
            </div>
            </div>
        </>
    )
}

export default ProductCart