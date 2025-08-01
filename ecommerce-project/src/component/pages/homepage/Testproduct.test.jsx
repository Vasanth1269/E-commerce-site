import {it , expect,describe , vi} from 'vitest';
import { render , screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HomeHTML } from './homepagegride';
import axios from 'axios';

vi.mock('axios');

describe('Test product components', ()=>{
       const product = {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"]
  }
      it('add to cart work ?', ()=>{
        
    
          
     
        render(<HomeHTML product={product} />)
           expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

      expect ( screen.getByText('$10.90')).toBeInTheDocument();

      expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')
      
      expect(screen.getByTestId('product-rating-stars')).toHaveAttribute("src","images/ratings/rating-45.png")
      
      expect(screen.getByText('87')).toBeInTheDocument()
    })

      
    

    it('add to cart work ?', async ()=>{
     
          
      const user = userEvent.setup()

        render(<HomeHTML product={product} />)
        const addToCartButton = screen.getByTestId('add-to-cart-button')
     await user.click(addToCartButton)
    expect(axios.post).toBeCalledWith('/api/cart-Items',{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
    })
 
   
})
})