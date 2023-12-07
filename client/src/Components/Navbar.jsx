import React, { useState } from 'react'
import { BsHandbagFill } from "react-icons/bs"
import { useGlobalContext } from '../Contextapi/Context'
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { Link, NavLink, Outlet } from 'react-router-dom'

const Navbar = () => {
  const [Menu, setMenu] = useState(true)
  const { Qty, setCart } = useGlobalContext()
  return (
    <>
      <nav className='navbar flex justify-between items-center  text-white w-full sticky  bg-black top-0 z-30  h-16 px-10 cursor-pointer'>
        <div className='logo flex justify-center items-center gap-3'>
          <Link to='/'><h1 className='text-green-500 flex justify-center items-center font-extrabold text-lg'><img className='w-9' src='./Images/logo.png' />Shopies</h1></Link>
        </div>
        <div className='flex  justify-end gap-8 items-center '>
          <div className='Cart-Icon relative' onClick={() => setCart(true)} >
            <BsHandbagFill className=' text-4xl text-green-500 w-full' />
            <p className='absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>{Qty}</p>
          </div>
          {Menu ? <GiHamburgerMenu className='humburger ' onClick={() => setMenu(false)} /> :
            null}
        </div>
      </nav>
      {!Menu ? (<div className='navbar-list flex flex-col justify-center items-center fixed z-40 bg-black' onClick={() => setMenu(true)}>
        <GrClose className='Cross-icon absolute text-3xl top-5 right-5 cursor-pointer ' />
        <ul className=' flex gap-6 flex-col text-4xl text-green-500'>
          <li className=''><NavLink to='/'>Home</NavLink></li>
          <li className=''><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
      </div>) : null}
      <Outlet/>
    </>
  )
}

export default Navbar