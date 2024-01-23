import React from 'react'
import { useGlobalContext } from '../Contextapi/Context'
import { MdOutlineShoppingBag,MdDeleteForever } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';


const AddCart = () => {
    const {productsCards, totalPrice, Qty, dispatch, setCart,DiscountPrices} = useGlobalContext()
    const navigate = useNavigate()
    const MakePayment = async()=>{
        try{
        const stripe = await loadStripe("pk_test_51OJGQsSD9gzrVkApzPM9GSgd0vAPUcFJC6WGDsv2bfVGYjCvLpRRCGK7DIjNE11tx8rYQUqOTsES0DYFd27ExK8G00vQCeZlHk")
        const response = await fetch("https://shopies-ecommerce-api.vercel.app/payment/create-checkout-session",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({productsCards,totalPrice,Qty})
        });
        if(response.ok){
        const session = await response.json()
        const result = stripe.redirectToCheckout({
            sessionId:session.id
        })
        navigate(session.success)
        navigate(session.cancel)
      }
    }catch(err){
        console.log(err);
    }
    }

    return (
        <>
            <div className='flex p-4 w-full ' onClick={() => setCart(false)}>
                <Link to='/products'><h1 className='flex gap-1 items-center text-xl absolute top-8 left-1 '><FaAngleLeft /><span className='opacity-70'>Your Cart</span><span className='text-green-500 ml-2'>({Qty} items)</span></h1></Link>
            </div>
            <div className='addCart flex justify-around items-center shadow-md'>
                {productsCards.length === 0 ?
                    (<div className='flex flex-col gap-2 justify-center items-center'>
                        <MdOutlineShoppingBag className='emptyCart text-green-500 opacity-50' />
                        <h1 className='text-center text-3xl opacity-70'>Your shopping bag is empty</h1>
                        <button className='py-2 px-5 bg-red-500  rounded-lg mt-2 opacity-80' onClick={() => setCart(false)}><Link to='/products'>CONTINUE SHOPPING</Link></button>
                    </div>)
                    :
                    (<div className='Card-inner flex justify-center items-center flex-col w-4/5 my-20'>
                        {productsCards.map((items) => {
                            let finalPrice = DiscountPrices(items);
                            return (
                                <div key={items.id} className='w-full'>
                                    <div className='Cart-Detials relative flex w-full justify-center items-center  my-1 gap-3 p-1'>
                                        <div className='w-1/2'>
                                            <img src={items.thumbnail} alt='items' className='AddCart-Images'/>
                                        </div>
                                        <div className='flex flex-col w-full justify-around items-center gap-4 '>
                                        <div className='flex w-full justify-around items-center'>
                                            <h1 className='w-1/4'>{items.title}</h1>
                                            <h1>${finalPrice}</h1>
                                            </div>
                                            <div className='flex justify-around items-center w-full gap-3 '>
                                            <div className='flex '>
                                                <button disabled={items.qty <= 1 ? true : false} onClick={() => dispatch({
                                                    type: "QTY_MINUS",
                                                    payload: {
                                                        id: items.id,
                                                        items,
                                                    }
                                                })}>-</button>
                                                <p className='border px-3 mx-2 text-center'>{items.qty}</p>
                                                <button className='' onClick={() => dispatch({
                                                    type: "QTY_PLUS",
                                                    payload: {
                                                        id: items.id,
                                                        items,
                                                    }
                                                })}>+</button>
                                            </div>
                                            <MdDeleteForever className='AddCart-RemoveBtn hover:text-red-500  cursor-pointer' onClick={() => dispatch({
                                                type: "REMOVE_ITEM",
                                                payload: {
                                                    id: items.id,
                                                    items,
                                                },
                                            })} />
                                        </div>
                                        </div>
                                    </div>
                                    <div className='w-full border-b border-green-500 opacity-20 mt-2'></div>
                                </div>
                            )
                        })
                        }
                        <div className=' flex justify-between flex-col w-full gap-4'>
                            <div className='total_Price flex justify-between items-center w-full m-auto py-2 px-5 mt-3'>
                                <h1>Subtotal:</h1>
                                <h1>${totalPrice}</h1>
                            </div>
                            <button className='AddCart-btn py-2 px-5 bg-green-500 w-1/3 m-auto rounded-lg ' onClick={MakePayment}>Checkout</button>
                        </div>
                    </div>)}
            </div>
        </>
    )
}

export default AddCart