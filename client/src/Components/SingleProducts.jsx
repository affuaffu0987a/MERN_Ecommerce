import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../Contextapi/Context';
import Footer from './Footer';
import AddCart from './AddCart';
import Rating from './Rating';
import Loader from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL3 = "https://dummyjson.com/products";

const SingleProducts = () => {
  const params = useParams()
  const [Singleproduct, setSingleproduct] = useState(params.id)
  const [Move,setMove] = useState(true)
  const [Img, setImg] = useState(0)
  const [SingleItems, setSingleItems] = useState([])
  const [SingleCategory, setCategory] = useState("")
  const { dispatch, TotalProducts, ShowCart, setCart, isLoader, setLoader,DiscountPrices} = useGlobalContext()

  const getSingleproducts = async (url) => {
    try {
      let res = await fetch(url)
      let singlePro = await res.json()
      setLoader(false)
      setSingleItems([singlePro])
      setCategory(singlePro.category)
    }
    catch (error) {
      document.write(error)
    }
  }

  useEffect(() => {
    getSingleproducts(`${URL3}/${Singleproduct}`)
  }, [Singleproduct])

  const singleCartItems =(item,finalPrice)=>{
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
      type: "ADD_SINGLEITEM",
      payload: {
        Newprice: finalPrice,
        id: item.id,
        item,
      }
    })
  }

  const AddcartLikeItems =(LikeItems,finalPrice)=>{
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
        Newprice: finalPrice,
        id: LikeItems.id,
        Products:LikeItems,
      }
    })
  }

  return (
    <>
      {ShowCart ? (<div className='Side-Cart w-1/2 right-0 top-0 bg-black z-50 fixed overflow-hidden'>
        <AddCart />
      </div>) : null}
      <div className={`Singleitems flex ${isLoader?'justify-center':'justify-start'} items-center`}>
      {isLoader ? <Loader /> : null}
        {SingleItems?.map((item) => {
          {/* ............Discount Price............. */ }
          let finalPrice = DiscountPrices(item);
          {/* ............Discount Price............. */ }
          return (
            <div key={item.id} className='singleItem-details flex  m-5 p-5 '>
              <div className='SingleProduct-img w-1/3'>
                <div className='w-full h-80'>
                  <img className=" object-fill w-full h-80" src={item.images[Img]} alt='Products' />
                </div>
                <div className='flex mt-6  w-full h-24 gap-1'>
                  {item.images.map((imgs, index) => {
                    return (
                      <div className='Images h-full' key={index} onMouseOver={() => setImg(index)}>
                        <img className=" object-fill object-center h-full " src={imgs} alt='Products' />
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='singleProduct-descriptions p-10 w-1/2'>
                <div className='Item-details mb-3 flex flex-col gap-2'>
                  <h1 className='text-3xl font-bold text-green-500'>{item.title}</h1>
                  <div className='flex  items-center gap-2'>
                    <Rating rates={item.rating} />
                    <p className='opacity-60'>{item.rating}</p>
                  </div>
                  <p>Brand: {item.brand}</p>
                  <p className='opacity-60'>Details:<br />{item.description}</p>
                  <h1 className='text-green-500 text-2xl'>${finalPrice}</h1>
                  <p className='text-base'><span className='text-green-500'>{item.discountPercentage}% Off</span><span className='line-through px-2 opacity-60'>${item.price}</span> ${finalPrice}</p>
                  <p>Stocks: {item.stock}</p>
                </div>
                <div className='flex w-full gap-5 '>
                  <button className='sigleitem-btn px-3 py-2  border border-green-500 text-xl hover:scale-110' onClick={()=> singleCartItems(item,finalPrice)}>Add to Cart</button>
                  <button className='sigleitem-btn px-3  py-2 border border-green-500  bg-green-500 text-xl hover:scale-110' onClick={()=>setCart(true)}>Buy Now</button>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
      <div className='overflow-hidden relative'>
      <h1 className='text-4xl font-extrabold text-center my-3'>You May Also Likes</h1>
      <div className={`maylike-products-container  ${Move?'track':'animate-none'}`} onMouseEnter={()=>setMove(false)} onMouseLeave={()=>setMove(true)}>
        {
          TotalProducts.map((LikeItems) => {
            let description = LikeItems.description.slice(0, 15)
            let title = LikeItems.title.slice(0, 19)
            {/* ...............Discount Price........... */}
            let finalPrice = DiscountPrices(LikeItems);
            if (LikeItems.category === SingleCategory) {
              return (
                <div key={LikeItems.id} className='LikesProducts relative flex flex-col  cursor-pointer ' >
                  <a href={`/${LikeItems.id}`}> <img className="w-full h-52  object-fill" src={LikeItems.thumbnail} alt='Products' />
                    <div className='card-content flex flex-col justify-center items-start p-3'>
                      <p className='absolute top-0 left-0 bg-green-500 p-1'>{LikeItems.brand}</p>
                      <h2 className=''>{title}...</h2>
                      <p className='opacity-50 text-sm'>{description}...</p>
                      <div className='flex justify-between items-center w-full mt-1'>
                        <p className=''><span className='line-through  opacity-60'>${LikeItems.price}</span> ${finalPrice}</p>
                      </div>
                    </div>
                  </a>
                  <button className='bg-green-500  w-16 rounded-full absolute bottom-4 right-2' onClick={() => AddcartLikeItems(LikeItems,finalPrice)}>Add</button>
                </div>
              )
            }
          })
        }
      </div>
      </div>
      <ToastContainer/>
      <Footer />
    </>
  )
}

export default SingleProducts