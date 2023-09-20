import React from 'react';
import Description from './Description';
import ProductContainer from './ProductContainer';
import Menu from './Menu';
import Footer from '../Footer';
import Checkout from './Checkout';
import { usePizzaContext } from '../PizzaContext';

const Homepage = () => {
  const { isCheckoutDisplay } = usePizzaContext();
  return (
    <>
      <Description />
      <Menu />
      <ProductContainer />

      {isCheckoutDisplay && <Checkout />}
      <Footer />
    </>
  );
};

export default Homepage;
