import React from "react";
import { Link } from "react-router-dom";
import treeIcon from "../../assets/images/tree.svg";
import switchIcon from "../../assets/images/switch.svg";
import heartIcon from "../../assets/images/heart.svg";
import bagIcon from "../../assets/images/bag.svg";
import s from "./index.module.css";

export default function Header() {
  return (
    <header className={s.nav_container}>
      <div className={s.nav_icons_left}>
        <img src={treeIcon} alt="" />
        <img src={switchIcon} alt="" />
      </div>

      <nav className="nav_menu">
        <Link to="/">Main page</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/products">All Products</Link>
        <Link to="/sales">All Sales</Link>
      </nav>

      <div className="nav_icons_right">
        <img src={heartIcon} alt="" />
        <img src={bagIcon} alt="" />
      </div>
    </header>
  );
}
