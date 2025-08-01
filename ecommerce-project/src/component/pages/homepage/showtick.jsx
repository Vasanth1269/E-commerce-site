import { useState } from 'react';
import { Fragment } from 'react';
import tick from '../../../../public/images/icons/checkmark.png'
import axios from 'axios';


export function ProductCard({productId , quantity}) {
  const [showTick, setShowTick] = useState(false);

  const handleAddToCart =  async() => {
  
    setShowTick(true);

       {await axios.post('https://e-commerce-site-egre.onrender.com/api/cart-Items',{
                    productId:productId,
                    quantity:quantity
                  })
   }

    setTimeout(() => {
      setShowTick(false);
    }, 1000);
  };


  return (




 <Fragment>

 
 <div className="product-spacer" style={{color:"green"}}>
                     
        {showTick && (
        <div className='add-to-cart'>
          <img
            src={tick}
            alt="Tick"
            style={{ width: '16px',
                   paddingRight: '5px'

             }}
          />
          Added
        </div>
      )}
    </div>
              

                <div className="added-to-cart">
                  <img src="images/icons/checkmark.png" />
                  Added
                </div>



      
  
    <button className="add-to-cart-button button-primary"
                
                data-testid='add-to-cart-button'
                 onClick={handleAddToCart  }>
                  Add to Cart
                </button>
    
  </Fragment>   
    
  );
}

