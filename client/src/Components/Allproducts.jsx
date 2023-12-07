import React from 'react'
import { useGlobalContext } from '../Contextapi/Context'
import Loader from './Loader';
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCart from './AddCart';
import Search from './Search';

const Allproducts = () => {
    const { AllProduct, isLoader, dispatch, Next, setNext, ShowCart, setCart,DiscountPrices } = useGlobalContext();

    const AddToCard = (allItems, finalPrice) => {
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
            type: "Add_TO_CART2",
            payload: {
                Newprice: finalPrice,
                id: allItems.id,
                allItems,
            }
        })
    }

    return (
        <>
                {ShowCart ? (<div className='Side-Cart w-1/2 right-0 top-0 bg-black z-50 fixed overflow-hidden'>
                    <AddCart />
                </div>) : null}
                <div className='AllProducts pt-24' onClick={() => setCart(false)}>
                    <h1 className='text-center text-5xl text-white  font-extrabold opacity-80'>Best Selling Products</h1>
                    <p className='mb-6 opacity-60 text-center text-base'>Shopies the world best products</p>
                    <Search />
                    <div id='ProductCard' className=' flex flex-wrap  gap-5 justify-center items-center'>
                        {isLoader ? <Loader /> : null}
                        {AllProduct?.map((allItems) => {
                            let descriptions = allItems.description.slice(0, 15)
                            let titles = allItems.title.slice(0, 19)
                            let finalPrice = DiscountPrices(allItems);
                            return (
                                <div key={allItems.id} id='CartDetails' className=' relative flex flex-col  cursor-pointer '>
                                    <Link to={`/${allItems.id}`}> <img className="w-52 h-52  object-fill" src={allItems.thumbnail} alt='Products' />
                                        <div className='card-content flex flex-col justify-center items-start p-3'>
                                            <p className='absolute top-0 left-0 bg-green-500 p-1'>{allItems.brand}</p>
                                            <h2 className=''>{titles}...</h2>
                                            <p className='opacity-50 text-sm'>{descriptions}...</p>
                                            <div className='flex justify-between items-center w-full mt-1'>
                                                <p className=''><span className='line-through opacity-60'>${allItems.price}</span> ${finalPrice}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <button className='bg-green-500  w-16 rounded-full absolute bottom-4 right-2' onClick={() => AddToCard(allItems, finalPrice)}>Add</button>

                                </div>
                            )
                        })}

                    </div>
                    <div className='flex justify-end items-center w-full mt-2 relative right-10'>
                        <button className='hover:bg-green-500 px-3 py-1 text-2xl border flex justify-center items-center gap-2'
                            disabled={AllProduct.length <= 10 ? true : false}
                            onClick={() => setNext(Next + 30)}
                        >Next<FaArrowRight className='next-btn' /></button>
                    </div>
                </div>
                {
                    <ToastContainer/>
                }
            <Footer />
        </>

    )
}

export default Allproducts