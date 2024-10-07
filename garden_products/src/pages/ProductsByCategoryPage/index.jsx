import React from 'react'
import ProductsContainer from '../../components/ProductsContainer'

function ProductsByCategoryPage({products}) {
  return (
    <div>
      <ProductsContainer products={products}/>
    </div>
  )
}

export default ProductsByCategoryPage