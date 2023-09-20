import { toast } from "react-hot-toast";


export const fetchProductCart = async (showBoundary) => {
    const token = localStorage.getItem('foody_token');
    if (token === null) {
      return;
    }
    try{

    const productCartResponse = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/fetchCartByUsername`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      }
    );
    const productCartJSON = await productCartResponse.json();
    const { cartProduct } = productCartJSON;
    return cartProduct;
    }catch(err){
      toast.error('Failed to fetch product')
      showBoundary(err);
    }  
  };

export const removeProduct = async(productId) => {
    try{
      const token = localStorage.getItem('foody_token');
    const removeProductApiResponse = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/removeProduct`,{
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({productId,token})
    });
    const removeProductResponseJson = await removeProductApiResponse.json();
    return removeProductResponseJson;
    }catch(err){
      toast.error('Something went wrong');
    }
  };