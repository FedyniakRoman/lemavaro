import React, { useState } from "react"; // useState hier importieren
import CartCortainer from "../../components/CartCortainer";
import { useDispatch, useSelector } from "react-redux";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import OrderForm from "../../components/OrderForm";
import { deleteAllAction } from "../../store/reducers/cartReducer";
import OrderModal from "../../components/OrderModal";

function CartPage() {
  const cartState = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна (открыто/закрыто)

  // Функция для отправки нового заказа
  const addNewOrder = (newOrder) => {
    fetch("http://localhost:3333/order/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newOrder),
    })
      .then((res) => res.json())
      .then((json) => console.log(json)); // Выводим ответ сервера в консоль
  };

  const clearCart = () => {
    dispatch(deleteAllAction()); // Отправляем действие для удаления всех товаров из корзины
  };

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
            <p className={s.empty_paragraph}>
              Looks like you have no items in your basket currently.
            </p>
            <Link to="/" className={s.empty_button}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Отображаем содержимое корзины */}
            <CartCortainer products={cartState} />
            {/* Передаем функции для оформления заказа и открытия модального окна */}
            <OrderForm
              addNewOrder={addNewOrder}
              clearCart={clearCart}
              setIsModalOpen={setIsModalOpen}
            />
          </>
        )}
      </div>
      {/* Модальное окно для подтверждения заказа */}
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

export default CartPage;
