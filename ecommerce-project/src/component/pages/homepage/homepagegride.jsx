


import {useState } from 'react';
import { ProductCard } from './showtick';

 export function HomeHTML({ product   }) {
   const [quantity , setQuantity] = useState(1);
     

 
   
   return (
              <div key={product.id} className="product-container"
               data-testid='product-container'
                 >
                <div className="product-image-container">
                  <img className="product-image"
                  data-testid="product-image"
                    src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img className="product-rating-stars"
                  data-testid = "product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                  ${(product.priceCents / 100).toFixed(2)}
                </div>

                <div  className="product-quantity-container">
                  <select  value={quantity} onChange={ async (Event)=>{
                   const selectvalue = Number(Event.target.value);
                   setQuantity(selectvalue)
                     
                  }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer">
                    
                </div>

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>

                 <ProductCard productId={product.id} quantity={quantity}  />
                  
                  
               

                  
              </div>
            )

}