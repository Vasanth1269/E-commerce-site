import dayjs from 'dayjs';
import { MoneyFormat } from '../../../utils/MoneyFormat';
import './orders.css';
import { Link } from 'react-router';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
export function Orders({ cart }) {
    const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrderDate = async () => {
      const Response = await axios.get('https://e-commerce-site-egre.onrender.com/api/orders?expand=products')
      setOrders(Response.data)

    }
    getOrderDate()
  }, [])

     const handleTrack = (orderId, productId) => {
    navigate('/tracking', {
      state: { orderId, productId }
    });
  };
    





  return (
    <>
      <div className="header">
        <div className="left-section">
          < Link to="/" className="header-link">
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

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format(" MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{MoneyFormat(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderproduct) => {

                    const BacktoCart = async () => {
                      await axios.post(`https://e-commerce-site-egre.onrender.com/api/cart-items`, {
                        productId: orderproduct.product.id,
                        quantity: orderproduct.quantity
                      })
                    }
                   

                        
                      
                    return (
                      <Fragment key={orderproduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderproduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderproduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            {dayjs(orderproduct.estimatedDeliveryTimeMs).format("dddd MMMM D")}
                          </div>
                          <div className="product-quantity">
                            Quantity:{orderproduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary" onClick={BacktoCart}>
                            <img className="buy-again-icon" src="images/icons/buy-again.png" />
                            <span className="buy-again-message" >Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                       
                            <button className="track-package-button button-secondary" onClick={() => handleTrack(order.id, orderproduct.product.id)} >
                              Track package
                            </button>
                          
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )

}