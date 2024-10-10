import React, { useEffect } from 'react'
import CartCortainer from '../../components/CartCortainer'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCartAction } from '../../store/reducers/cartReducer';

function CartPage() {

  const cartState = useSelector(store => store.cart)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(addProductToCartAction);
  })
  console.log('cartState',cartState);
  
  return (
    <div>
      {cartState.length === 0 
      ? <p>Looks like you have no items in your basket currently.</p>
      : <CartCortainer products={cartState}/>}
    </div>
  )
}

export default CartPage