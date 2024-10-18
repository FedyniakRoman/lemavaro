import React, { useState } from "react";
import OrderModal from "../OrderModal";
import { useSelector } from "react-redux";
import s from "./index.module.css";

function OrderForm({ addNewOrder, clearCart }) {
    const cartState = useSelector((store) => store.cart);
    const [isModalOpen, setIsModalOpen] = useState(false);

    let totalSum = cartState.reduce((acc, elem) => {
        return elem.discont_price !== null
            ? acc + (elem.discont_price * elem.count)
            : acc + (elem.price * elem.count);
    }, 0);

    const submitOrder = (event) => {
        event.preventDefault();
        const { name, phone, email } = event.target;

        const newOrder = {
            id: Date.now(),
            name: name.value,
            phone: phone.value,
            email: email.value
        };
        addNewOrder(newOrder);
        clearCart();
        setIsModalOpen(true);
        event.target.reset();
    };

    return (
        <div className={s.order_container}>
            <h3 className={s.order_title}>Order details</h3>
            <p className={s.total_items}>{`${cartState.length} items`}</p>
            <div className={s.total_price_box}>
                <p className={s.total_title}>Total</p>
                <p className={s.total_sum}>{`$${totalSum}`}</p>
            </div>
            <form onSubmit={submitOrder} className={s.order_form}>
                <input type="text" placeholder="Name" name="name" className={s.input} />
                <input type="tel" placeholder="Phone number" name="phone" className={s.input} />
                <input type="email" placeholder="Email" name="email" className={s.input} />
                <button className={s.form_button}>Checkout</button>
            </form>
            <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

export default OrderForm;
