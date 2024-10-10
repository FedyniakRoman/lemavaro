import React from "react";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import heartIcon from "../../assets/images/heartWhite.svg";
import bagIcon from "../../assets/images/bagWhite_new.svg";

function ProductCard({ id, title, image, price, discont_price }) {
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
          <button className={s.btn_icon_heart}>
            <img src={heartIcon} alt="Heart Icon" className={s.img_icon_heart} />
          </button>
          <button className={s.btn_icon_bag}>
            <img className={s.img_icon_bag} src={bagIcon} alt="Bag Icon" />
          </button>
        </div>
        <div className={s.add_btn_container}>
          <button className={s.add_btn}>Add to cart</button>
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
            <p className={s.price_original}>{`$${price}`}</p>
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
