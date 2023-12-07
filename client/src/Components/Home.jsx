import React from 'react'
import ProductCart from './ProductCart'
import Footer from './Footer'
import About from './About'
import AddCart from './AddCart'
import { useGlobalContext } from '../Contextapi/Context'
import { IoMdFlower } from "react-icons/io";
import Services from './Services'

function Home() {
  const {ShowCart,setCart} = useGlobalContext()
  return (
    <>
    {ShowCart?(<div className='Side-Cart w-1/2 right-0 top-0 bg-black z-50 fixed overflow-hidden'>
    <AddCart/>
    </div>):null}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" onClick={()=>setCart(false)}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active relative">
            <div className='carousel-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 w-4/5 '>
              <h1 className='text-7xl font-extrabold'><span className='border-b-2 border-green-500'>Welcome to </span> <span className='text-green-500'>Shopies...</span></h1>
              <p className='opacity-60 mt-4 mb-4'>Your premier destination for a seamless and delightful online shopping experience! At Shopies,
                we believe in bringing you a curated selection of high-quality products that cater to your diverse needs.</p>
              <a className='home-btn px-4 py-2  bg-green-500 hover:bg-transparent' href='#Products'>Explore Now</a>
            </div>
            <img src="./Images/home2.jpg" className="crousel-img object-center object-fill  opacity-30 w-full" alt="..." />
          </div>
          <div className="carousel-item">
            <div className='Discount-Details absolute top-24  text-white  px-4 z-10 mt-3'>
              <h1 className='head text-8xl text-green-500 font-extrabold mb-2'>Shopies...</h1>
              <p className='para opacity-70 text-base text-green-500 underline'>your premier destination for a seamless and delightful online shopping experience.</p>
              <h1 className='head2 text-9xl font-extrabold'>WINTER SALE</h1>
              <h1 className='head3 text-8xl font-semibold '>50-70% OFF</h1>
              <p className='para2 text-3xl opacity-80 '>Hurry Up! and Grap the Opportuniy..</p>
              <button className='home-btn px-4 py-1 mt-3  text-lg bg-green-500 font-bold hover:bg-transparent'><a className='' href='#Products'>Shop Now</a></button>
            </div>
            <img src="./Images/home3.jpg" className="crousel-img object-center object-fill opacity-30 w-full " alt="..." />
          </div>
        </div> 
        </div>
        <Services/>
        <div id='Products'>
          <ProductCart />
        </div>
        <div className='w-4/5 border-b opacity-20 border-green-500 m-auto '></div>
        <About/>
        <Footer/>
      </>
      )
}

export default Home