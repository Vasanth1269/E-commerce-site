import {HomePage } from './component/pages/homepage/homepage'
import { CheckOut } from './component/pages/Checkout/checkout'
import { Orders } from './component/pages/orders/orders'
import { TrackingPage } from './component/pages/tracking/tracking'
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  

  return (
    <Routes>
      <Route  index element={ <HomePage />} />
      <Route path='checkout' element = {<CheckOut/>} />
      <Route path='orders' element = {<Orders />} />
      <Route path='tracking' element = {<TrackingPage />} />
      
      
    </Routes>
   
  )
}

export default App
