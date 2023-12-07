import React, { useState } from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const [subsMsg,setSubsMsg] = useState("")
    const [userSubcribe,setSubcribe] = useState({
        email:""
    });

    const handleInput = (e)=>{
        const {name,value} = e.target;
        setSubcribe({
            ...userSubcribe,
            [name]:value
        })
    }

    const handelForm= async(e)=>{
        e.preventDefault()
       try{
        const response = await fetch("http://localhost:5000/v1/subscribe",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userSubcribe)
        })
        const res = await response.json()
        if(response.ok){
            setSubcribe({
                email:""
            })
            setSubsMsg(res.msg)
        }
        else{
            setSubsMsg(res.msg)
        }

        setTimeout(()=>{
            setSubsMsg("");
        },3000)

       }
       catch(err){
        console.log(err);
       }
    }

    return (
        <>
            <div className='footer py-4  mt-4  relative bottom-0 w-full'>
                <div className='footer-inner flex gap-5 p-7 justify-around items-start '>
                    <div className='footer-description w-1/4 p-1'>
                        <h1 className='text-lg font-extrabold text-green-500 border-b border-green-500 inline-block'>Shopies.Com</h1>
                        <p className='opacity-50 text-sm '>your premier destination for a seamless and delightful online shopping experience! At Shopies</p>
                    </div>
                    <div className=''>
                        <p>Subscribe to get important update</p>
                        <form onSubmit={handelForm}>
                        <input 
                        className='outline-none p-1 bg-transparent  mt-1' 
                        type='email' 
                        name='email'
                        value={userSubcribe.email}
                        placeholder='YOUR E-MAIL' 
                        onChange={handleInput}
                        />
                        <button className='p-1 bg-green-500  mt-2 border' type='submit'>SUBSCRIBE</button>
                        </form>
                        <p className='text-sm opacity-50'>{subsMsg}</p>
                    </div>
                    <div>
                        <h1>Follow Us</h1>
                        <div className='flex gap-3 mt-2 cursor-pointer'>
                            <FaInstagram className='rounded-full   text-3xl w-7 p-1  text-green-600  hover:scale-125 ' />
                            <FaFacebookSquare className='rounded-full  text-3xl w-7 p-1  text-green-600 hover:scale-125' />
                            <FaTwitter className='rounded-full  text-3xl w-7 p-1  text-green-600 hover:scale-125' />
                        </div>
                    </div>
                    <div>
                        <h1>Call Us</h1>
                        <p>+91 9087654321</p>
                    </div>
                </div>
                <div className='w-full border-b opacity-20 border-green-500 '></div>
                <div className='copyright flex justify-around pt-2'>
                    <p>{new Date().getFullYear()} Shopies All Rights Reserved</p>
                    <div>
                        <p>PRIVACY POLICY</p>
                        <p>TERMS & CONDITION</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer