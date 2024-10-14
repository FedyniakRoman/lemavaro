import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getSingleProductPage} from "../../requests/products"
import s from "./index.module.css";
import heartIcon from "../../assets/images/heartWhite.svg";
import { setLoadingStatus } from "../../store/reducers/singleProductReducer";


export default function SingelProductPage() {

  const {product_id} = useParams();

  const dispatch = useDispatch();

  useEffect(() => 
    dispatch(getSingleProductPage(product_id)), [product_id]);

  const singleProductState = useSelector(store => store.singleProduct);


  const {status, data} = singleProductState || { status: "loading", data: {} }

const { id,title, price, discont_price,description, image} = data

return (
 
    <div className={s.container_single_card}>
      {/* Блок с изображением продукта */}
      <div className={s.image_section}>
        <img
          src={`http://localhost:3333/product_img/${id}.jpeg`}
          alt={title}
          className={s.image}
        />
        <div className={s.icons_container}>
          <img src={heartIcon} alt="Heart Icon" className={s.img_icon_heart} />
        </div>
      </div>

      {/* Блок с информацией о продукте */}
      <div className={s.inform_section}>
        <h1 className={s.title}>{title}</h1>

        <div className={s.price_section}>
          <span className={s.price_discounted}>${discont_price}</span>
          <span className={s.price_original}>${price}</span>
          <span className={s.discount_badge}>-17%</span>
        </div>

        {/* Блок управления количеством и кнопка добавления в корзину */}
        <div className={s.add_to_cart_section}>
          <div className={s.quantity_controls}>
            <button className={s.quantity_btn}>-</button>
            <span className={s.quantity_value}>1</span>
            <button className={s.quantity_btn}>+</button>
          </div>
          <button className={s.add_btn}>Add to cart</button>
        </div>

        {/* Блок с описанием продукта */}
        <div className={s.description_section}>
          <h3>Description</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  
);
}
