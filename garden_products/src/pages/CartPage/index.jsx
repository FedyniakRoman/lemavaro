import React, { useEffect } from "react";
import CartCortainer from "../../components/CartCortainer";
import { useSelector } from "react-redux";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import OrderForm from "../../components/OrderForm";

function CartPage() {
  const cartState = useSelector((store) => store.cart);
  console.log('cartState', cartState);
  
  // let totalSum = cartState.reduce((acc, elem) => {
  //   return elem.discont_price !== null
  //     ? acc + (elem.discont_price * elem.initialCount)
  //     : acc + (elem.price * elem.initialCount);
  // }, 0);

  return (
    <section className={s.container}>
      <div className={s.title_container}>
        <h2 className={s.title_page}>Shopping cart</h2>
        <div className={s.nav_container}>
          <div className={s.nav_list}>
            <div className={s.linie}></div>
            <Link to={"/"} className={s.item}>
              Back to the store
            </Link>
          </div>
        </div>
      </div>
      <div className={s.cart_container}>
        {cartState.length === 0 ? (
          <div className={s.empty_container}>
            <p className={s.empty_paragraph}>Looks like you have no items in your cart currently.</p>
            <Link to="/" className={s.empty_button}>
            Continue Shopping
            </Link>
            </div>
        ) : (
          <>
            <CartCortainer products={cartState} />
            <OrderForm />
          </>
        )}
      </div>
    </section>
  );
}

export default CartPage;
