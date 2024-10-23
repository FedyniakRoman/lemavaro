import s from "./index.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { IoIosClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  decrementCountAction,
  deleteProductFromCartAction,
  incrementCountAction,
} from "../../store/reducers/cartReducer";
import backendUrl from "../../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.

// Компонент для отображения товара в корзине
function CartItem({ id, image, title, count, price, discont_price }) {
  const dispatch = useDispatch(); // Инициализация функции dispatch для вызова действий в Redux
  const finalPrice = discont_price || price;
  const priceDiscount = finalPrice * count;
  const originalPrice = price * count;

  return (
    <div className={s.card}>
      <img
        src={`${backendUrl}${image}`} // Путь к изображению товара
        alt={title}
        className={s.img} // Применение стилей к изображению
      />
      <div className={s.info_block}>
        <div className={s.top_section}>
          <p className={s.product_title}>{title}</p> {/* Название товара */}
          {/* Кнопка для удаления товара из корзины */}
          <IoIosClose
            className={s.icon_delete}
            onClick={() => dispatch(deleteProductFromCartAction(id))}
          />
        </div>
        <div className={s.price_block}>
          <div className={s.count_container}>
            <AiOutlineMinus
              className={s.count_button}
              onClick={() => dispatch(decrementCountAction(id))}
            />
            <p className={s.count_value}>{count}</p> {/* Количество товаров */}
            <AiOutlinePlus
              className={s.count_button}
              onClick={() => dispatch(incrementCountAction(id))}
            />
          </div>
          <div className={s.price_container}>
            {discont_price ? (
              <>
                {/* Новая цена отображается без зачеркнутого стиля */}
                <p className={s.price_discounted}>{`$${priceDiscount.toFixed(
                  1
                )}`}</p>
                {/* Старая цена отображается зачеркнутой */}
                <p className={s.price_original}>{`$${originalPrice.toFixed(
                  1
                )}`}</p>
              </>
            ) : (
              // Если скидки нет, отображаем только обычную цену без зачёркивания
              <p className={s.price_no_discounted}>{`$${originalPrice.toFixed(
                1
              )}`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
