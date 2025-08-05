
import { useLocation, Link } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { Trackingprogress } from './trackingprogressBar';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import './tracking.css';


export function TrackingPage({cart}) {
  const [tracking, setTracking] = useState([])
  const location = useLocation();

  const { orderId, productId } = location.state;
  useEffect(() => {

    axios.get('https://e-commerce-site-egre.onrender.com/api/orders?expand=products')
      .then((Response) => {
        setTracking(Response.data)

      })


  }, [])

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{cart.length}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="tracking-page">
        {tracking.map((trackproduct) => {
                  
        
          const isCorrectOrder = trackproduct.id === orderId;
          const matchedProduct = trackproduct.products.find(product => product.productId === productId);
        
          if (isCorrectOrder && matchedProduct) {
            return (
              <div className="order-tracking" key={trackproduct.id}>
                <Link className="back-to-orders-link link-primary" to="/orders">
                  View all orders
                </Link>



                <div className="delivery-date">
                  Arriving on {dayjs(matchedProduct.estimatedDeliveryTimeMs).format('dddd MMMM D')}
                </div>
                <div className="product-info">
                  {matchedProduct.name}
                </div>
                <div className="product-info">
                  Quantity: {matchedProduct.quantity}
                </div>
                <img className="product-image" src={matchedProduct.product.image} />
               

                  <Trackingprogress  orderDate={trackproduct.orderTimeMs} deliverydate={matchedProduct.estimatedDeliveryTimeMs}  />
                  
                
              </div>
            )
          }

        })}

      </div>


    </>
  )

}