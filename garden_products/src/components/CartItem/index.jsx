import React from "react";
import s from "./index.module.css";
import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteProductFromCartAction } from "../../store/reducers/cartReducer";

// Компонент для отображения товара в корзине
function CartItem({ id, image, title, count, price, discont_price }) {
  const dispatch = useDispatch(); // Инициализация функции dispatch для вызова действий в Redux
  console.log(discont_price);
  
  return (
    <div className={s.card}>
      <img
        src={`http://localhost:3333${image}`} // Путь к изображению товара
        alt={title}
        className={s.img} // Применение стилей к изображению
      />
      <div className={s.info_block}>
        <div className={s.top_section}>
          <p>{title}</p> {/* Название товара */}
          {/* Кнопка для удаления товара из корзины */}
          <IoIosClose className={s.icon_delete}
            onClick={() => dispatch(deleteProductFromCartAction(id))}
          />
        </div>
        <div className={s.price_block}>
          <div className={s.count_container}>
            <button className={s.count_button}>-</button>
            <p className={s.count_value}>{count}</p> {/* Количество товаров */}
            <button className={s.count_button}>+</button>
          </div>
          <div className={s.price_container}>
          {discont_price ? (
            <>
             {/* Новая цена отображается без зачеркнутого стиля */}
             <p className={s.price_discounted}>{`$${discont_price}`}</p>
              {/* Старая цена отображается зачеркнутой */}
              <p className={s.price_original}>{`$${price}`}</p>
            </>
          ) : (
            // Если скидки нет, отображаем только обычную цену без зачёркивания
            <p className={s.price_no_discounted}>{`$${price}`}</p>
          )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default CartItem;
