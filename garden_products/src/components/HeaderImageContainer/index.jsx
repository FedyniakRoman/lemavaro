import React from 'react';
import { Link } from 'react-router-dom'; 
import s from '../Header/index.module.css'; 

const HeaderImageContainer = () => {
  return (
    <div className={s.header_image_container}>
      <p className={s.header_image_text}>
        Amazing Discounts on Garden Products!
      </p>

      <Link to="/sales" className={s.header_image_button}>
        Check out
      </Link> 
    </div>
  );
};

export default HeaderImageContainer;