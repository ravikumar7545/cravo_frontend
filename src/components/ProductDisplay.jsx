import React from 'react';
import { motion } from 'framer-motion';
import '../scss/product_display.scss';

const ProductDisplay = (props) => {
  const { name, price, veg_nonVeg } = props.value;
  const { setProductDisplayTrigger } = props;
  return (
    <div id="product-display">
      <motion.div
        onClick={(e) => e.stopPropagation()}
        key={price}
        initial={{
          y: '-200%',
          x: '-50%',
          opacity: 0,
        }}
        animate={{
          y: '-50%',
          x: '-50%',
          opacity: 1,
        }}
        exit={{ opacity: 1, y: '-200%', x: '100%' }}
        className="product-details"
      >
        <h2>Product Details</h2>
        <img
          className="close_display"
          src={require('../images/close.png')}
          onClick={() => {
            setProductDisplayTrigger(false);
          }}
          alt="close_display"
        />
        <p>
          Product Name: <span>{name}</span>
        </p>
        <p>
          Product price: <span>{price}</span>
        </p>
        <p>
          Category: <span>{veg_nonVeg === 'nonVeg' ? 'Non Veg' : 'Veg'}</span>
        </p>
      </motion.div>
    </div>
  );
};

export default ProductDisplay;
