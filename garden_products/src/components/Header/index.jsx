import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import treeIcon from "../../assets/images/tree.svg";
import switchIcon from "../../assets/images/switch.svg";
import heartIcon from "../../assets/images/heart.svg";
import bagIcon from "../../assets/images/bag.svg";
import s from "./index.module.css";
import ProductCard from "../ProductCard";


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productOfTheDay, setProductOfTheDay] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTreeIconClick = () => {
    navigate('/');
  };

  const getRandomProduct = (products) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    setError(null);

    try {
      
      const response = await fetch("http://localhost:3333/products/all"); 
      if (!response.ok) {
        throw new Error("Error");
      }
      const products = await response.json();

      const randomProduct = getRandomProduct(products); 
      setProductOfTheDay(randomProduct); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <div className={s.discount_container} onClick={handleOpenModal}>
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
          <Link to={'/cart'}>
          <img className={s.bag_icon} src={bagIcon} alt="Bag Icon" />
          </Link>
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

      
{isModalOpen && (
  <div className={s.modal_overlay} onClick={handleCloseModal}>
    <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
      <div className={s.modal_header_container}>
        <h2 className={s.modal_header}>50% discount on product of the day</h2>
        <button className={s.modal_close_button} onClick={handleCloseModal}>X</button>
      </div>

      {productOfTheDay && (
        <div className={s.modal_product_card_container}>
          <ProductCard
            id={productOfTheDay.id}
            title={productOfTheDay.title}
            image={productOfTheDay.image}
            price={productOfTheDay.price}
            discont_price={productOfTheDay.discont_price}
          />
          <div className={s.add_to_cart_container}>
            <button className={s.add_to_cart_button}>Add to cart</button>
          </div>
        </div>
      )}
    </div>
  </div>
)}
    </header>
  );
}
