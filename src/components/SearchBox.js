import React, { useState } from 'react';
import { usePizzaContext } from '../PizzaContext';
import SearchProductList from './SearchProductList';

const SearchBox = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const { product } = usePizzaContext();
  return (
    <div className="navbar-search">
      <input
        type="text"
        placeholder="Search product"
        className="search-box"
        spellCheck={false}
        onChange={(e) => setSearchProduct(e.target.value)}
      />
      {searchProduct !== '' ? (
        <img
          className="search-icon"
          src={require('../images/search_gif.gif')}
          alt="Search gif"
        />
      ) : (
        <img
          className="search-icon"
          src={require('../images/search_icon.png')}
          alt="Search icon"
        />
      )}

      {searchProduct !== '' ? (
        <div className="search-suggestion">
          {searchProduct !== '' &&
            product
              ?.filter(
                (product) =>
                  product.name.toLowerCase().includes(searchProduct) ||
                  product.name.includes(searchProduct)
              )
              ?.map((product) => <SearchProductList product={product}/>)}

              
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SearchBox;
