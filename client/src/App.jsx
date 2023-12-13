import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleProducts from './Components/SingleProducts'
import Contact from './Components/Contact'
import Allproducts from './Components/Allproducts'
import Error from './Components/Error'
import PaySuccess from './Components/PaySuccess'
import PayCancel from './Components/PayCancel'

const App = () => {
  return (
    <BrowserRouter>
       
      <Routes>
        <Route path='' element={ <Navbar/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/products' element={<Allproducts/>}/>
        <Route path='/:id' element={<SingleProducts/>}/>
        </Route>
        <Route path='*' element={<Error/>} />
        <Route path='/'  element ={<PaySuccess/>}/>
        <Route path='/' element={<PayCancel/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App