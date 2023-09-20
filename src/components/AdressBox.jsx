import React, { useState } from 'react';
import { usePizzaContext } from '../PizzaContext';
import '../scss/adress_box.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdressBox = ({ setIsCheckoutBox, setIsCheckoutDisplay }) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const { cart, totalProductPrice } = usePizzaContext();
  const [userAdress, setUserAdress] = useState({
    name: '',
    locality: '',
    city: '',
    phone: '',
  });
  const adressHandler = (e) => {
    setUserAdress({ ...userAdress, [e.target.name]: e.target.value });
  };
  const placeOrder = async () => {
    let ordered_product_name = [];
    let token = localStorage.getItem('foody_token');
    let address = Object.values(userAdress).join(',');

    cart.forEach((product) => {
      ordered_product_name.push(product.id.name + ',');
    });

    const placeOrderResponse = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/place_order`,
      {
        ordered_product_name,
        totalProductPrice,
        token,
        address,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { success, message } = placeOrderResponse.data;
    if (success) {
      toast.success(message);
      setIsSuccess(true);
    } else {
      toast.error('Something went wrong');
    }
    setTimeout(() => {
      setIsCheckoutDisplay(false);
    }, 5000);
  };
  return (
    <>
      <img
        onClick={() => setIsCheckoutBox(true)}
        id="back-btn"
        src={require('../images/back_arrow.png')}
        alt="Back"
      />
      {isSuccess ? (
        <p id="success_order_message">
          Order placed successfully. Look into orders for more.Redirecting to
          homepage in few seconds
        </p>
      ) : (
        <div className="adress-box">
          <label>
            Name
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              onChange={(e) => adressHandler(e)}
            />
          </label>

          <label>
            Locality
            <input
              type="text"
              onChange={(e) => adressHandler(e)}
              name="locality"
              placeholder="Enter locality"
            />
          </label>
          <label>
            City
            <input
              type="text"
              onChange={(e) => adressHandler(e)}
              name="city"
              placeholder="Enter city"
            />
          </label>
          <label>
            Phone Number
            <input
              type="number"
              onChange={(e) => adressHandler(e)}
              name="pincode"
              placeholder="Enter pincode"
            />
          </label>

          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </>
  );
};

export default AdressBox;
