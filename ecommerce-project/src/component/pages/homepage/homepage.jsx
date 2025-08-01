import { Link } from 'react-router';
import axios from 'axios'
import { useEffect,useState } from 'react';
import { HomeHTML } from './homepagegride';
import './homepage.css';
import './header.css';



export function HomePage({ cart , LoadingCart}) {
  
  const [products , setProducts] = useState([]);
 
  useEffect(()=>{
       const getHomeData = async ()=>{

  const Response  =  await axios ("https://e-commerce-site-egre.onrender.com/api/products") 
    setProducts(Response.data)
    }
     getHomeData ()
  },[])
  
  
     return(
       <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo"
              src= "images/logo-white.png" />
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

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{cart.length}</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      <div className="home-page">
        <div className="products-grid">

          {products.map((product) => {
            return (
              <HomeHTML key={product.id}  product={product} cart={cart} loadingCart={LoadingCart} />
            )
          })}
          
        </div>
      </div>
    </>
     )

}
