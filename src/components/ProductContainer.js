import React from 'react';
import '../scss/product_container.scss';
import { usePizzaContext } from '../PizzaContext';
import ProductBox from './ProductBox';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const ProductContainer = () => {
  const { menu,product,isProductLoading } = usePizzaContext();
  
  return (
      <div className="product-container">
        {isProductLoading && 
        
        
        Array(5).fill(0).map((_,i)=>(<div key={i} className="product">
        <Skeleton className='product-image'/>
        <Skeleton count={2} className='skeleton'/>       
          </div>))   }
      {(!isProductLoading && product.length === 0) && <p id="no_order_diplay">Oops... Looks like there is no product</p>}
        {product
          ?.filter((ele) => ele.category === menu)
          .map((ele) => <ProductBox value={ele} key={ele._id}/>)}
      </div>
  );
};

export default ProductContainer;
