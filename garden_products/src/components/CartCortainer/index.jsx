import React from "react";
import CartItem from "../CartItem";

// Компонент для отображения списка товаров в корзине
function CartContainer({ products }) {
  return (
    <div>
      {/* Отображение каждого товара в корзине с помощью компонента CartItem */}
      {products.map((product) => (
        <CartItem key={product.id} {...product} /> // Передача всех свойств товара в CartItem
      ))}
    </div>
  );
}

export default CartContainer;

