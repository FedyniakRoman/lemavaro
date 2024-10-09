import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import treeIcon from "../../assets/images/tree.svg";
import switchIcon from "../../assets/images/switch.svg";
import heartIcon from "../../assets/images/heart.svg";
import bagIcon from "../../assets/images/bag.svg";
import s from "./index.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTreeIconClick = () => {
    navigate('/'); 
  };

  return (
    <header className={s.nav_container}>
      <div className={s.header_container_top}>
        <div className={s.nav_icons_left}>
          <img
            className={s.tree_icon}
            src={treeIcon}
            alt="Tree Icon"
            onClick={handleTreeIconClick}
            style={{ cursor: "pointer" }}
          />
          
          <img
            className={s.switch_icon}
            src={switchIcon}
            alt="Switch Icon"
            style={{ cursor: "pointer" }} 
          />
        </div>

        <nav className={s.nav_menu_container}>
          <div className={s.discount_container}>
            <p className={s.discount_text}>1 day discount!</p>
          </div>

          <div className={s.nav_menu}>
            <Link to="/">Main page</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/products">All Products</Link>
            <Link to="/sales">All Sales</Link>
          </div>
        </nav>

        <div className={s.nav_icons_right}>
          <img className={s.heart_icon} src={heartIcon} alt="Heart Icon" />
          <img className={s.bag_icon} src={bagIcon} alt="Bag Icon" />
        </div>
      </div>

      {location.pathname === "/" && (
        <div className={s.header_image_container}>
          <p className={s.header_image_text}>
            Amazing Discounts <br/> on Garden Products!
          </p>
          <button className={s.header_image_button}>Check out</button>
         
        </div>
      )}
    </header>
  );
}