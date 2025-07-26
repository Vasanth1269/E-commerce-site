import {HomePage } from './component/pages/homepage/homepage'
import { CheckOut } from './component/pages/Checkout/checkout'
import { Orders } from './component/pages/orders/orders'
import { useEffect , useState } from 'react'
import axios from 'axios'
import { TrackingPage } from './component/pages/tracking/tracking'
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  const [cart , setCart] = useState([])
  function LoadingCart() {
      const getCartData = async ()=>{
   const Response = await axios ("/api/cart-items?expand=product")
      setCart(Response.data)
      }
     getCartData()
  };
  
   useEffect(()=>{
      LoadingCart();
   },[cart])
   
   
  return (
    <Routes>
      <Route  index element={ <HomePage cart = {cart} LoadingCart ={LoadingCart} />} />
      <Route path='checkout' element = {<CheckOut cart = {cart} />} />
      <Route path='orders' element = {<Orders cart = {cart} />} />
      <Route path='tracking' element = {<TrackingPage />} />
      
      
    </Routes>
   
  )
}

export default App
