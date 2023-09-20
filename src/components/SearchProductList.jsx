import React, { useState } from 'react';
import ProductDisplay from './ProductDisplay';

const SearchProductList = ({ product }) => {
  const [searchDisplay, setSearchDisplay] = useState(false);
  return (
    <div key={product._id}>
      <p className="search-product-list" onClick={() => setSearchDisplay(true)}>
        {product.name} {product.category}
      </p>
      {searchDisplay && (
        <ProductDisplay
          key={product._id}
          value={product}
          setProductDisplayTrigger={setSearchDisplay}
        />
      )}
    </div>
  );
};

export default SearchProductList;
