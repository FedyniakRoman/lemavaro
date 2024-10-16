import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../requests/products";
import s from "./index.module.css";
import heartIcon from "../../assets/images/heartWhite.svg";
import { setLoadingStatus } from "../../store/reducers/singleProductReducer";

export default function SingleProductPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => dispatch(getSingleProduct(id)), [id]);

  const singleProductState = useSelector((store) => store.singleProduct);
  
  

  const {status, data} = singleProductState  || { status: "loading", data: [] }
   const product = data[0] || {};

  const {title, price, discont_price,description, image} = product

  return (
    <div className={s.container_single_card}>

       <nav className={s.nav}>
      <ul className={s.nav_list}>
        <li className={s.item}>
          <Link to={"/"} className={s.link}>
            Main page
          </Link>
        </li>
        <li className={s.item}>
          <Link to={"/categories"}>Categories</Link>
        </li>
        <li className={s.all_card}>
          <Link to={"/products"}> All Products</Link>
        </li>
        {product &&
        <li className={s.item}>
         
          <Link to={`/products/${id}`}>{product.title} className={s.card_name}</Link>
        </li>}
      </ul>
    </nav>

      {/* Блок с изображением продукта */}
      <div className={s.image_section}>
        <img
          src={`http://localhost:3333${image}`}
          alt={title}
          className={s.image}
        />
      </div>
      

      {/* Блок с информацией о продукте и иконка*/}
      <div className={s.inform_section}>
        <div className={s.section_title_and_icons}>
          <Link to={`/products/${id}`} className={s.title_link}>
            <h3 className={s.title}>{`${title}`}</h3>
          </Link>
          <div className={s.icons_container}>
            <img
              src={heartIcon}
              alt="Heart Icon"
              className={s.img_icon_heart}
            />
          </div>
        </div>

        <div className={s.price_section}>
        <span className={s.price_original}>${price}</span>
          <span className={s.price_discounted}>${discont_price || price}</span>
          {discont_price && (
            <span className={s.discount_badge}>
              -{Math.round(((price - discont_price) / price) * 100)}%
            </span>
          )}
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
        <h3 className={s.description}>Description</h3>
          <p className={s.description_text}>{`${description}`}</p>
          
        </div>
        <div className="s.read_more">
          <h4 className={s.read}> Read more</h4>
        </div>
      </div>
    </div>
  );
}
