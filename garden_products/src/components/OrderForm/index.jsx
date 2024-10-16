import React from 'react'
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";

function OrderForm() {
  const cartState = useSelector((store) => store.cart);

  let totalSum = cartState.reduce((acc, elem) => {
    return elem.discont_price !== null
      ? acc + (elem.discont_price * elem.count)
      : acc + (elem.price * elem.count);
  }, 0);
  return (
    <div className={s.order_container}>
    <h3 className={s.order_title}>Order details</h3>
    <p className={s.total_items}>{`${cartState.length} items`}</p>
    <div className={s.total_price_box}>
      <p className={s.total_title}>Total</p>
      <p className={s.total_sum}>{`$${totalSum}`}</p>
    </div>
    <form className={s.order_form}>
      <input type="text" placeholder="Name" name="name" className={s.input} />
      <input type="tel" placeholder="Phone number" className={s.input} />
      <input type="email" placeholder="Email" className={s.input} />
      <button className={s.form_button}>Checkout</button>
    </form>
  </div>
  )
}

export default OrderForm