import React from "react";
import CartItem from "../CartItem";
import s from './index.module.css';

// Компонент для отображения списка товаров в корзине
function CartContainer({ products }) {
  return (
    <div className={s.cart_container}>
      {/* Отображение каждого товара в корзине с помощью компонента CartItem */}
      {products.map((product) => (
        <CartItem key={product.id} {...product} /> // Передача всех свойств товара в CartItem
      ))}
    </div>
  );
}

export default CartContainer;

