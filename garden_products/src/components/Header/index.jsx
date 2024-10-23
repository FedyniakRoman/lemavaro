import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import treeIcon from "../../assets/images/tree.svg";
import switchIcon from "../../assets/images/switch.svg";
import heartIcon from "../../assets/images/heart.svg";
import bagIcon from "../../assets/images/bag.svg";
import s from "./index.module.css";
import ProductCard from "../ProductCard";
import ThemeToggle from "../ThemeToggle"; // Импорт компонента для переключения Темы Приложения
import { useSelector } from "react-redux";
import backendUrl from "../../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Функция для перехода на главную страницу
  const handleTreeIconClick = () => {
    navigate("/");
  };

  // Функция для получения случайного продукта из массива продуктов
  const getRandomProduct = (products) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  // Функция для открытия модального окна и загрузки продукта дня
  const handleOpenModal = async () => {
    setIsModalOpen(true);
    setLoading(true);
    setError(null);

    const today = new Date().toDateString(); // Текущая дата в строковом формате
    const savedProduct = JSON.parse(localStorage.getItem("productOfTheDay")); // Проверяем, есть ли сохраненный товар в localStorage

    // Если товар дня уже сохранен и дата совпадает с сегодняшней
    if (savedProduct && savedProduct.discountDate === today) {
      setProductOfTheDay(savedProduct); // Используем сохраненный товар
      setLoading(false);
      return;
    }

    // Если товара нет в localStorage или дата не совпадает — загружаем новый товар
    try {
      const response = await fetch(`${backendUrl}/products/all`);
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const products = await response.json();

      // Выбираем случайный продукт
      const randomProduct = getRandomProduct(products);

      // Устанавливаем 50% скидку и сохраняем в localStorage
      const discountProduct = {
        ...randomProduct,
        discont_price: randomProduct.price / 2, // Устанавливаем цену с 50% скидкой
        discountDate: today // Привязываем скидку к сегодняшнему дню
      };

      // Сохраняем товар в localStorage
      localStorage.setItem("productOfTheDay", JSON.stringify(discountProduct));

      setProductOfTheDay(discountProduct);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const cartState = useSelector(state => state.cart)
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

          <ThemeToggle />

          {/* <img
            className={s.switch_icon}
            src={switchIcon}
            alt="Switch Icon"
            style={{ cursor: "pointer" }}
          /> */}
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
          <Link to={"/favorites"} className={s.icon_box}>
            <img className={s.heart_icon} src={heartIcon} alt="Heart Icon" />
            <span className={s.favorite_count}>0</span>
          </Link>
          <Link to={"/cart"} className={s.icon_box}>
            <img className={s.bag_icon} src={bagIcon} alt="Bag Icon" />
            <span className={s.cart_count}>{cartState.reduce((total, product) => total + product.count, 0)}</span>
          </Link>
        </div>
      </div>

      {location.pathname === "/" && (
        <div className={s.header_image_container}>
          <p className={s.header_image_text}>
            Amazing Discounts <br /> on Garden Products!
          </p>
          <Link to="/sales" className={s.header_image_button}>
            Check out
          </Link>
        </div>
      )}

      {isModalOpen && (
        <div className={s.modal_overlay} onClick={handleCloseModal}>
          <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
            <div className={s.modal_header_container}>
              <h2 className={s.modal_header}>
                50% discount on product of the day
              </h2>
              <button
                className={s.modal_close_button}
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {productOfTheDay && (
              <div className={s.modal_product_card_container}>
                
                <ProductCard
                  id={productOfTheDay.id}
                  title={productOfTheDay.title}
                  image={productOfTheDay.image}
                  price={productOfTheDay.price} 
                  discont_price={productOfTheDay.discont_price.toFixed(2)} // Округляем цену с 50% скидкой 
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