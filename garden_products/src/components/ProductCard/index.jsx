import React from "react";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs";
import { TiHeartFullOutline } from "react-icons/ti";
import {
  addProductToCartAction,
  deleteProductFromCartAction,
} from "../../store/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ id, title, image, price, discont_price }) {
  const dispatch = useDispatch();

  // Доступ к состоянию корзины из Redux
  const cart = useSelector((state) => state.cart);

  // Проверяем, находится ли товар в корзине
  const isInCart = cart.some((product) => product.id === id);

  // Функция для обработки клика на иконку сумки
  const handleBagClick = () => {
    const productInCart = cart.find((product) => product.id === id);

    if (productInCart) {
      // Если товар в корзине, удаляем его
      dispatch(deleteProductFromCartAction(id));
    } else {
      // Если товара нет в корзине, добавляем его
      dispatch(
        addProductToCartAction({ id, title, image, price, discont_price })
      );
    }
  };

  // Функция для вычисления скидки
  const calculateSaleValue = (price, discont_price) => {
    if (price > 0 && discont_price !== null) {
      const saleValue = ((price - discont_price) / price) * 100;
      return Math.round(saleValue);
    }
    return null;
  };

  const saleValue = calculateSaleValue(price, discont_price);

  return (
    <div className={s.card}>
      <div className={s.img_container}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <img src={`http://localhost:3333${image}`} alt={title} className={s.img} />
        </Link>
        <div className={s.add_btn_container}>
          <button
            className={`${s.add_btn} ${isInCart ? s.white : ""} ${
              isInCart ? s.added : ""
            }`}
            onClick={handleBagClick}
          >
            {isInCart ? "Added" : "Add to cart"}
          </button>
        </div>
        <div className={s.icons_container}>
          <TiHeartFullOutline className={s.btn_icon_heart} />
          <BsHandbagFill
            className={`${s.btn_icon_bag} ${isInCart ? s.green : ""} ${isInCart ? s.added_bag : ""}`}
            onClick={handleBagClick}
          />
        </div>
      </div>
      <div className={s.products_information}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <h3 className={s.title}>{title}</h3>
        </Link>
        <div className={s.price_container}>
          {discont_price ? (
            <>
              <p className={s.price_original}>{`$${price}`}</p>
              <p className={s.price_discounted}>{`$${discont_price}`}</p>
            </>
          ) : (
            <p className={s.price_no_discount}>{`$${price}`}</p>
          )}
        </div>
      </div>
      {saleValue !== null && (
        <div className={s.sale_value_container}>
          <p className={s.sale_value}>{`-${saleValue}%`}</p>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
