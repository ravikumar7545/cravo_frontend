import React from 'react';
import '../scss/product_container.scss';
import { usePizzaContext } from '../PizzaContext';
import ProductBox from './ProductBox';
const ProductContainer = () => {
  const { menu,product } = usePizzaContext();
  
  return (
      <div className="product-container">
        {product
          ?.filter((ele) => ele.category === menu)
          .map((ele) => <ProductBox value={ele} key={ele._id}/>)}
      </div>
  );
};

export default ProductContainer;
