import React from "react";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import { BsHandbagFill } from "react-icons/bs";
import { TiHeartFullOutline  } from "react-icons/ti";
import { addProductToCartAction } from "../../store/reducers/cartReducer";
import { useDispatch } from "react-redux";

function ProductCard({ id, title, image, price, discont_price }) {
  const calculateSaleValue = (price, discont_price) => {
    if (price > 0 && discont_price !== null) {
      const saleValue = ((price - discont_price) / price) * 100;
      return Math.round(saleValue);
    }
    return null;
  };
  const dispatch = useDispatch()
  const saleValue = calculateSaleValue(price, discont_price);
  return (
    <div className={s.card}>
      <div className={s.img_container}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <img src={`http://localhost:3333${image}`} alt={title} className={s.img} />
        </Link>
        <div className={s.add_btn_container} >
            <button className={s.add_btn} onClick={()=>dispatch(addProductToCartAction({id, title, image, price, discont_price}))}>Add to cart</button>
        </div>
        <div className={s.icons_container}>
        <TiHeartFullOutline  className={s.btn_icon_heart}/>
        <BsHandbagFill className={s.btn_icon_bag}/>
        </div>
      </div>
      <div className={s.products_information}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <h3 className={s.title}>{title}</h3>
        </Link>
        <div className={s.price_container}>
          {discont_price ? (
            <>
              {/* Старая цена отображается зачеркнутой */}
              <p className={s.price_original} style={{ textDecoration: 'line-through' }}>{`$${price}`}</p>
              {/* Новая цена отображается без зачеркнутого стиля */}
              <p className={s.price_discounted}>{`$${discont_price}`}</p>
            </>
          ) : (
            // Если скидки нет, отображаем только обычную цену без зачёркивания
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