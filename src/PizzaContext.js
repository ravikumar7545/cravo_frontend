import { createContext, useContext, useEffect, useState } from 'react';
import { fetchProductCart } from './lib/product';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-hot-toast';

import { useErrorBoundary } from 'react-error-boundary';

const PizzaContext = createContext();

export const usePizzaContext = () => useContext(PizzaContext);

const PizzaProvider = ({ children }) => {
  const [menu, setMenu] = useState('pizza');
  const [user, setUser] = useState({ username: '', fullName: '' });
  const [cart, setCart] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState('');
  const [product, setProduct] = useState([]);
  const [isCheckoutDisplay, setIsCheckoutDisplay] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const [isProductLoading, setIsProductLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const fetchAllProduct = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/allProducts`
      );
      const fetchProductJson = await fetchAllProduct.json();
      setProduct(fetchProductJson.allProducts);
      setIsProductLoading(false);
    } catch (err) {
      toast.error('Failed to fetch product');
      showBoundary(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    // Fetching cart
    fetchProductCart(showBoundary).then((data) => setCart(data));

    // Accessing previous logged in user
    if (localStorage.getItem('foody_token') !== null) {
      const token = localStorage.getItem('foody_token');
      const { username, fullName } = jwtDecode(token);
      setUser({ username: username, fullName: fullName });
    }
  }, []);

  useEffect(() => {
    if (cart?.length > 0) {
      const totalPrice = cart
        ?.map(
          (product) => parseFloat(product.id.price) * parseInt(product.quantity)
        )
        .reduce((acc, current) => acc + current);
      setTotalProductPrice(totalPrice);
    } else {
      setTotalProductPrice(0);
    }
  }, [cart]);

  return (
    <PizzaContext.Provider
      value={{
        menu,
        setMenu,
        user,
        setUser,
        setCart,
        cart,
        product,
        totalProductPrice,
        isCheckoutDisplay,
        setIsCheckoutDisplay,
        isProductLoading,
      }}
    >
      {children}
    </PizzaContext.Provider>
  );
};

export default PizzaProvider;
