import React, { useEffect } from "react";
import CartCortainer from "../../components/CartCortainer";
import { useSelector } from "react-redux";
import s from "./index.module.css";
import { Link } from "react-router-dom";

function CartPage() {
  const cartState = useSelector((store) => store.cart);

  let totalSum = cartState.reduce((acc, elem) => {
    return elem.discont_price !== null
      ? acc + (elem.discont_price * elem.initialCount)
      : acc + (elem.price * elem.initialCount);
  }, 0);

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
            <p className={s.empty_paragraph}>Looks like you have no items in your basket currently.</p>
            <Link to="/" className={s.empty_button}>
            Continue Shopping
            </Link>
            </div>
        ) : (
          <>
            <CartCortainer products={cartState} />
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
          </>
        )}
      </div>
    </section>
  );
}

export default CartPage;
