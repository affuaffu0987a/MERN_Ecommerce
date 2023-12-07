import React from 'react'
import Footer from './Footer'
import AddCart from './AddCart'
import { useGlobalContext } from '../Contextapi/Context'
import { useState } from 'react'
import Swal from 'sweetalert2'

const Contact = () => {
  const [Queries,setQueries] = useState({
    username:"",
    email: "",
    message: ""
  })

  const {ShowCart,setCart} = useGlobalContext()

  const handleInputs = (e)=>{
    const {name,value} = e.target;
    setQueries({
      ...Queries,
      [name]: value
    })
  }

  const handleForm = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/v1/query",{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(Queries)
      })
      if(response.ok){
        const res = await response.json();
        Swal.fire({
          text: `${res.msg}`,
          icon: "success"
        })
        setQueries({
          username:"",
          email: "",
          message: ""
        })
      }
    }
    catch(err){
      document.write(err);
    }
  }

  return (
    <>
     {ShowCart?(<div className='Side-Cart w-1/2 right-0 top-0 bg-black z-50 fixed overflow-hidden' >
    <AddCart/>
    </div>):null}
    <div className='contact-page ' onClick={()=>setCart(false)}>
       <div className="container flex ">
       <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30141.344360276475!2d72.8083818639568!3d19.209695925895108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6c71e00b21f%3A0xfa74b1f57d575513!2sKandivali%2C%20Kandivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700302747361!5m2!1sen!2sin" 
        width="600" 
        height="450" 
        style={{border:0}} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"></iframe>
        <div className="contact-form">
          <form className="contact-inputs" onSubmit={handleForm}>
            <input
              type="text"
              name="username"
              value={Queries.username}
              placeholder="username"
              autoComplete="off"
              required
              onChange={handleInputs}
            />

            <input
              type="email"
              name="email"
              value={Queries.email}
              placeholder="Email"
              autoComplete="off"
              required
              onChange={handleInputs}
            />

            <textarea
              className='p-2 outline-none'
              name="message"
              value={Queries.message}
              cols="30"
              rows="6"
              autoComplete="off"
              placeholder='Any Queries'
              required
              onChange={handleInputs}
            ></textarea>
            <button className='bg-green-500 w-1/2 m-auto py-1 text-xl rounded-lg' type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Contact