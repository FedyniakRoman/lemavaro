import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {getSingleProductPage} from "../../requests/products"
import s from "./index.module.css";
import ProductCard from "../../components/ProductCard";
import heartIcon from "../../assets/images/heartWhite.svg";


export default function SingelProductPage() {
  const { product_id } = useParams();

  const dispatch = useDispatch();

  const singleProductState = useSelector(store => store.singleProduct);

  useEffect(() => dispatch(getSingleProductPage(product_id)), []);

  const {status, data} = singleProductState || { status: "loading", data: {} }

const { id,title, image, price, discont_price} = data



  return (
    
    <div className={s.single_card}>
      <div className={s.img}>
        <Link to={`/products/${id}`} className={s.img_link}> 
          <img
            src={`http://localhost:3333${image}`}
            alt={title}
            className={s.img}
          />
        </Link>


        <div className={s.icons_container}>
            <img src={heartIcon} alt="Heart Icon" className={s.img_icon_heart}/>
        </div>
      
      </div>
      <div className={s.products_title}>
        <Link to={`/products/${id}`} className={s.img_link}>
          <h3 className={s.title}>{title}</h3>
        </Link>
      <div className={s.price_container}>
      <p className={s.price_original}>{`${price}`}</p>
          {discont_price !== null && ( 
            <p className={s.price_discounted}>{`${discont_price}`}</p>
          )}
      </div>
      </div>

      <ProductCard product={data}/>
    </div>
    
  );
}

