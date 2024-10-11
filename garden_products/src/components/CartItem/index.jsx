import React from "react";
import s from "./index.module.css";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteProductFromCartAction } from "../../store/reducers/cartReducer";

// Компонент для отображения товара в корзине
function CartItem({ id, image, title, count, price }) {
  const dispatch = useDispatch(); // Инициализация функции dispatch для вызова действий в Redux

  return (
    <div>
      <p>{title}</p> {/* Название товара */}
      <img
        src={`http://localhost:3333${image}`} // Путь к изображению товара
        alt={title}
        className={s.img} // Применение стилей к изображению
      />
      <p>{count}</p> {/* Количество товаров */}
      {/* Кнопка для удаления товара из корзины */}
      <IoIosClose onClick={() => dispatch(deleteProductFromCartAction(id))} />
    </div>
  );
}

export default CartItem;
