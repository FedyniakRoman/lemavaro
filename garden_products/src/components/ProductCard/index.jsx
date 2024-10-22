import React from "react";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs";
import { TiHeartFullOutline } from "react-icons/ti";
import { addProductToFavoritesAction, deleteProductFromFavoritesAction } from "../../store/reducers/favoritesReducer"; // Убедитесь, что это импортировано
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ id, title, image, price, discont_price }) {
  const dispatch = useDispatch();

  // Получаем список избранных товаров из store
  const favorites = useSelector((store) => store.favorites);
  
  // Ищем текущий товар в избранном
  const favoriteProduct = favorites.find((product) => product.id === id);

  // Функция добавления/удаления товара в избранное
  const handleToggleFavorite = () => {
    if (favoriteProduct) {
      dispatch(deleteProductFromFavoritesAction(id)); // Удаляем товар из избранного
    } else {
      dispatch(addProductToFavoritesAction({ id, title, image, price, discont_price })); // Добавляем товар в избранное
    }
  };

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
        <div className={s.icons_container}>
          {/* Иконка сердца с динамическим изменением цвета */}
          <TiHeartFullOutline
            className={s.btn_icon_heart}
            onClick={handleToggleFavorite}
            style={{ color: favoriteProduct ? '#92A134' : 'white' }} // Закрашиваем иконку зелёным, если товар в избранном
          />
          <BsHandbagFill className={s.btn_icon_bag} />
        </div>
      </div>
      <div className={s.products_information}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <h3 className={s.title}>{title}</h3>
        </Link>
        <div className={s.price_container}>
          {discont_price ? (
            <>
              <p className={s.price_original} style={{ textDecoration: 'line-through' }}>{`$${price}`}</p>
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