import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { usePizzaContext } from '../PizzaContext';
import { removeProduct } from '../lib/product';
import AdressBox from './AdressBox';

const CheckoutBox = () => {
  const [isCheckoutBox, setIsCheckoutBox] = useState(true);
  const { setIsCheckoutDisplay, cart, setCart, totalProductPrice } =
    usePizzaContext();

  const removeProductFromCart = async (productId) => {
    const removeProductResponse = await removeProduct(productId);
    const { userCartproduct, success, message } = removeProductResponse;
    const { product } = userCartproduct;
    if (success) {
      setCart(product);
      toast.success(message);
    } else {
      toast.error(message + 'Something went wrong');
    }
  };

  const quantityCounter = async (productId, val, quantity = 1) => {
    if (val === 'dec' && quantity === 1) return;
    const token = localStorage.getItem('foody_token');
    const quantityCounterResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/quantityCounter`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, token, val }),
      }
    );
    const quantityCounterJSON = await quantityCounterResponse.json();
    const { success, message, cartProduct } = quantityCounterJSON;
    if (success) {
      toast.dismiss();
      toast.success(message);
      setCart(cartProduct.product);
    } else {
      toast.error(message);
    }
  };

  return (
    <motion.div
      style={{ backgroundColor: '#ecf0f1' }}
      key="first"
      initial={{
        y: '-50%',
        x: '-150%',
      }}
      animate={{
        y: '-50%',
        x: '-50%',
      }}
      exit={{ opacity: 0 }}
      className="checkout-display-bar"
    >
      <img
        className="close-icon"
        onClick={() => setIsCheckoutDisplay((p) => !p)}
        src={require('../images/close_icon.png')}
        alt="close"
      />
      {/* <div className="checkout-navigation">
        <div className="checkout-navigation-box" id="navigation-box-1">
          <p>1</p>
        </div>
        <div className="checkout-navigation-box 2" id="navigation-box-2">
          <p>2</p>
        </div>
        <div className="checkout-navigation-box 3" id="navigation-box-3">
          <p>3</p>
        </div>
      </div> */}
      <h2 className="checkout-heading">
        {isCheckoutBox ? 'Order Details' : 'Delievery Address'}{' '}
      </h2>
      <AnimatePresence mode="wait">
        {isCheckoutBox ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ x: '-200%' }}
            key="helelelelelele"
            className="checkout-main-product-container"
          >
            <div className="checkout-product-box">
              {cart?.length === 0 ? (
                <p id="loading-cart">No product to display</p>
              ) : (
                cart?.map((product) => {
                  return (
                    <div key={product._id} className="cart-product">
                      {console.log(product)}
                      <img
                        className="product-image"
                        src={require(`../images/products/${product.id.image_path}`)}
                        alt="cart-product"
                      />
                      <p className="cart-product-name">{product.id.name}</p>

                      <div className="cart-product-counter">
                        <img
                          onClick={() =>
                            quantityCounter(
                              product._id,
                              'dec',
                              product.quantity
                            )
                          }
                          className="cart-counter"
                          src={require('../images/decrease_icon.png')}
                          alt="decrease"
                        />
                        {product.quantity}
                        <img
                          onClick={() => quantityCounter(product._id, 'inc')}
                          className="cart-counter"
                          src={require('../images/increase_icon.png')}
                          alt="increase"
                        />
                      </div>

                      <p className="cart-product-price">
                        <span>₹ </span>
                        {product.id.price * parseInt(product.quantity)}
                      </p>

                      <img
                        onClick={() => removeProductFromCart(product._id)}
                        className="remove_icon"
                        src={require('../images/remove_icons.png')}
                        alt="Remove"
                      />
                    </div>
                  );
                })
              )}
            </div>
            <div className="checkout-product-pricebox">
              <h3>Price to pay</h3>

              <div className="checkout-product-total-price">
                <p className="price-container">
                  Product Price<span>₹ {totalProductPrice}</span>
                </p>
                <p className="price-container">
                  Service Charge
                  <span>₹ {(totalProductPrice * 0.018).toFixed(2)}</span>
                </p>
              </div>
              <p className="price-container">
                Product Price<span>₹ {totalProductPrice}</span>
              </p>

              <button
                className="checkout-btn"
                onClick={() => setIsCheckoutBox(false)}
              >
                BUY
              </button>
            </div>
          </motion.div>
        ) : (
          <AdressBox
            setIsCheckoutBox={setIsCheckoutBox}
            setIsCheckoutDisplay={setIsCheckoutDisplay}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CheckoutBox;
