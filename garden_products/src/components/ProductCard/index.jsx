import React, { useState } from "react"; 
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs";
import { TiHeartFullOutline } from "react-icons/ti";
import { addProductToCartAction, incrementCountAction } from "../../store/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ id, title, image, price, discont_price }) {
  // Состояние для управления иконкой избранного
  const [isFavorite, setIsFavorite] = useState(false); 
  
  // Состояние для управления иконкой корзины
  const [isInCart, setIsInCart] = useState(false); 
  
  const dispatch = useDispatch();
  
  // Доступ к состоянию корзины из Redux
  const cart = useSelector(state => state.cart); 

  // Функция для вычисления скидки
  const calculateSaleValue = (price, discont_price) => {
    if (price > 0 && discont_price !== null) {
      const saleValue = ((price - discont_price) / price) * 100;
      return Math.round(saleValue);
    }
    return null;  // Возвращаем null, если скидки нет
  };

  const saleValue = calculateSaleValue(price, discont_price);

  // Функция для добавления товара в избранное
  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);  // Переключаем состояние избранного

  };

  // Функция для добавления товара в корзину
  const handleBagClick = () => {
    const productInCart = cart.find(product => product.id === id);  // Проверяем, есть ли товар уже в корзине
    if (productInCart) {
      dispatch(incrementCountAction(id));
    } else {
      // Если товара нет в корзине, добавляем его
      dispatch(addProductToCartAction({ id, title, image, price, discont_price }));
    }
    setIsInCart(true);  // Устанавливаем состояние для изменения цвета иконки корзины
  };

  return (
    <div className={s.card}>
      <div className={s.img_container}>
        {/* Ссылка на страницу товара */}
        <Link to={`/products/${id}`} className={s.img_link}>
          <img src={`http://localhost:3333${image}`} alt={title} className={s.img} />
        </Link>
        <div className={s.add_btn_container}>
          {/* Кнопка для добавления товара в корзину */}
          <button className={s.add_btn} onClick={() => handleBagClick()}>Add to cart</button>
        </div>
        <div className={s.icons_container}>
          {/* Иконка избранного с возможностью клика */}
          <TiHeartFullOutline
            className={`${s.btn_icon_heart} ${isFavorite ? s.green : ''}`} // Цвет меняется в зависимости от состояния
            onClick={handleFavoriteClick}
          />
          {/* Иконка корзины с возможностью клика */}
          <BsHandbagFill
            className={`${s.btn_icon_bag} ${isInCart ? s.green : ''}`} // Цвет меняется в зависимости от состояния
            onClick={handleBagClick}
          />
        </div>
      </div>
      <div className={s.products_information}>
        {/* Ссылка на страницу товара */}
        <Link to={`/products/${id}`} className={s.img_link}>
          <h3 className={s.title}>{title}</h3>
        </Link>
        <div className={s.price_container}>
          {discont_price ? (
            <>
              {/* Зачёркнутая старая цена */}
              <p className={s.price_original} style={{ textDecoration: 'line-through' }}>{`$${price}`}</p>
              {/* Новая цена со скидкой */}
              <p className={s.price_discounted}>{`$${discont_price}`}</p>
            </>
          ) : (
            // Если скидки нет, показываем только обычную цену
            <p className={s.price_no_discount}>{`$${price}`}</p>
          )}
        </div>
      </div>
      {saleValue !== null && (
        <div className={s.sale_value_container}>
          {/* Отображение значения скидки в процентах */}
          <p className={s.sale_value}>{`-${saleValue}%`}</p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
