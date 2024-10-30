import React from "react";
import { Link } from 'react-router-dom'; 
import s from './index.module.css'; 
import bannerImage from '../../assets/images/banner.svg'

function DiscountBanner() {
  return (
    <div className={s.container}>
      <img src={bannerImage} alt="bunner_with_discount" className={s.img}/>
      <div className={s.content_box}>
        <h1 className={s.content}>
          Amazing Discounts <br />on Garden Products!HUHU
        </h1>
        <Link to="/sales" className={s.button}>
          Check out HUHU
        </Link>
      </div>
    </div>
  );
}

export default DiscountBanner;
