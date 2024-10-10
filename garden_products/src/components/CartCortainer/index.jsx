import React from 'react'
import CartItem from '../CartItem'

function CartCortainer({products}) {
  return (
    <div>
        {products.map(product=><CartItem
        key={product.id}
        {...product}
        />)}
    </div>
  )
}

export default CartCortainer