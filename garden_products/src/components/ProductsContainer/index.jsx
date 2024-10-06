import React from 'react'
import s from './index.module.css'
import ProductCard from '../ProductCard';

function ProductsContainer({products}) {
  
    
  return (
    <div className={s.container}>
    {products.map(product => <ProductCard
      key={product.id}
      {...product}
    />)
    }
  </div>
  )
}

export default ProductsContainer