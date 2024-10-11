import React, { useEffect } from 'react'
import CartCortainer from '../../components/CartCortainer'
import { useSelector } from 'react-redux'
import s from './index.module.css'

function CartPage() {

  const cartState = useSelector(store => store.cart)

  return (
    <section className={s.container}>
       <div className={s.wrapper}>
      <h2 className={s.title}>Shopping cart</h2>
    <div className={s.cart_container}>
      {cartState.length === 0 
      ? <p>Looks like you have no items in your basket currently.</p>
      : <CartCortainer products={cartState}/>}
      </div>
      </div>
    </section>
  )
}

export default CartPage