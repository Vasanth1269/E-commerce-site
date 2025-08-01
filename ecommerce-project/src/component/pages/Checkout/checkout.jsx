  import './Checkout-header.css';
  import { useNavigate } from 'react-router';
  import './checkout.css';
  import dayjs from 'dayjs';
  import { useEffect ,useState } from 'react';
  import  axios  from 'axios';
  import { Link } from 'react-router';
  import { MoneyFormat } from '../../../utils/MoneyFormat';


export function CheckOut({ cart }) {
  const [deliveryOptions , setDeliveryOptions] = useState([])
  const [paymentsummary , setPaymentsummary] = useState([])
 useEffect (() =>{
   axios('https://e-commerce-site-egre.onrender.com/api/delivery-options?expand=estimatedDeliveryTime')
     .then ((Response)=>{
       setDeliveryOptions(Response.data)
     })
  

         axios('https://e-commerce-site-egre.onrender.com/api/payment-summary')
         .then ((Response)=>{
            setPaymentsummary(Response.data);
         })
 },[cart]);
  const Navigate = useNavigate()
 const PlaceOrder = async()=> {
    await axios.post('https://e-commerce-site-egre.onrender.com/api/orders')
      Navigate('/orders');
  }
  
 
return (
    <>
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src="images/logo.png" />
            <img className="mobile-logo" src="images/mobile-logo.png" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<a className="return-to-home-link"
            href="/">{cart.length} items</a>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
          {cart.map((CartItem)=>{
            
             const deleteItems = async () =>{
                     await axios.delete(`https://e-commerce-site-egre.onrender.com/api/cart-Items/${CartItem.productId}`)
    
   }
              const selectdeliveryOption = deliveryOptions.find((deliveryOption)=>{
                    return deliveryOption.id === CartItem.deliveryOptionId;
                  });
            return(
              
              <div key={CartItem.product.id} className="cart-item-container">
            <div className="delivery-date">
              Delivery date: {dayjs(selectdeliveryOption.estimatedDeliveryTimeMs).format("dddd MMMM D")}
              
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={CartItem.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {CartItem.product.name}
                </div>
                <div className="product-price">
                  {MoneyFormat(CartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{CartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary" onClick={deleteItems }>
                    Delete
                  </span>
                </div>
              </div>

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                      
                {deliveryOptions.length >0 && deliveryOptions.map((deliveryOption)=>{
                 
                    let Shppingprice = "FREE Shipping";
                    const UpdatadeliveryOptions =  async()=>{
                    await  axios.put(`/api/cart-items/${CartItem.productId}`,{
                        deliveryOptionId:deliveryOption.id
                      })
                    }

                    if (deliveryOption.priceCents > 0) {
                      Shppingprice = `${MoneyFormat(deliveryOption.priceCents)}-Shipping`

                    }
                  return(
                  <div key= {deliveryOption.id} className="delivery-option">
                  <input type="radio" onClick={UpdatadeliveryOptions}  checked = {deliveryOption.id === CartItem.deliveryOptionId}
                 
                    className="delivery-option-input"
                    name={`delivery-option-${CartItem.productId}`} />
                  <div>
                    <div className="delivery-option-date">
                      {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd MMMM  D")}
                    </div>
                    <div className="delivery-option-price">
                      {Shppingprice}
                    </div>
                  </div>
                </div>
                  )
                })}
              
              </div>
            </div>
          </div>
            )
          })}
          
        </div>
          
                     <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>

            <div className="payment-summary-row">
              <div>Items ({paymentsummary.totalItems}):</div>
              <div className="payment-summary-money">{MoneyFormat(paymentsummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">{MoneyFormat( paymentsummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">{MoneyFormat(paymentsummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">{MoneyFormat(paymentsummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
              <div>Order total:</div>
          <div className="payment-summary-money">{MoneyFormat(paymentsummary.totalCostCents)}</div>
            </div>
            

            <button className="place-order-button button-primary" onClick={PlaceOrder}>
              Place your order
            </button>
        </div>

      </div>
    </div>
    </>
)
}