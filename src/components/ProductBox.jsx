import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePizzaContext } from '../PizzaContext';
import ProductDisplay from './ProductDisplay';

const ProductBox = (props) => {
  const [productDisplayTrigger, setProductDisplayTrigger] = useState(false);
  const { setCart } = usePizzaContext();
  const { name, price, veg_nonVeg, image_path } = props.value;
  let isVeg_nonVeg = '';
  if (isVeg_nonVeg !== undefined) {
    isVeg_nonVeg = veg_nonVeg;
  }

  //  * Add to cart
  const addToCart = async (e, productProperties) => {
    e.stopPropagation();
    if (localStorage.getItem('foody_token') === null) {
      toast.error('User need to login');
      return;
    }
    const productId = productProperties._id;
    const token = localStorage.getItem('foody_token');
    const addToCartResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/addToCart`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, token }),
      }
    );
    const addToCartJSON = await addToCartResponse.json();
    const { success, cartProduct } = addToCartJSON;
    if (success) {
      toast.dismiss();
      toast.success('Added to Cart');
      setCart(cartProduct);
    } else {
      toast.error('Failed to add Product');
    }
  };

  return (
    <div
      className="product"
      onClick={() => setProductDisplayTrigger(!productDisplayTrigger)}
    >
      <img
        className="product-image"
        src={require(`../images/products/${image_path}`)}
        alt="Pizza"
      />
      <p className="product-title">{name}</p>
      <div>
        <p className="product-price">
          <span>₹</span> {price}
        </p>

        {isVeg_nonVeg === 'veg' ? (
          <img
            className="veg-nonveg-icon"
            src={require('../images/veg_icon.png')}
            alt="veg_icon"
          />
        ) : (
          ''
        )}
        {isVeg_nonVeg === 'nonVeg' ? (
          <img
            className="veg-nonveg-icon"
            src={require('../images/non_veg_icon.png')}
            alt="non_veg_icon"
          />
        ) : (
          ''
        )}

        <button
          className="add-to-cart-btn"
          onClick={(e) => addToCart(e, props.value)}
        >
          &#43;
        </button>
      </div>
      {productDisplayTrigger && (
        <ProductDisplay
          value={props.value}
          setProductDisplayTrigger={setProductDisplayTrigger}
        />
      )}
    </div>
  );
};

export default ProductBox;
