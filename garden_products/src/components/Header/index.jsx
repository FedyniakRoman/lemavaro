import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import treeIcon from "../../assets/images/tree.svg";
import s from "./index.module.css";
import ThemeToggle from "../ThemeToggle"; // Импорт компонента для переключения Темы Приложения
import { useSelector } from "react-redux";
import backendUrl from "../../config"; // Переменная для удобного переключения между локальным и удаленным бэкендом.
import ModalDiscountContainer from "../ModalDiscountContainer";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi";




export default function Header() {
  const location = useLocation();

  const showLine = location.pathname !== '/'
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Состояние для бокового меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(isMenuOpen);
  
  // Функция для переключения состояния меню
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Получаем состояние корзины и избранных товаров из Redux
  const cartState = useSelector((state) => state.cart);
  const favoritesState = useSelector((state) => state.favorites);

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

  return (
    <header className={s.header_wrapper}>
      <div className={s.nav_container}>
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
              <IoIosHeartEmpty className={s.heart_icon} />
              <span className={s.favorite_count}>{favoritesState.length}</span> {/* Количество товаров в избранном */}
            </Link>
            <Link to={"/cart"} className={s.icon_box}>
              <HiOutlineShoppingBag className={s.bag_icon}/>
              <span className={s.cart_count}>
                {cartState.reduce((total, product) => total + product.count, 0)}
              </span>
            </Link>
          </div>

          <div className={s.burger_icon} onClick={toggleMenu}> 
              {isMenuOpen ? <RxCross2 /> :  <RxHamburgerMenu />}
          </div>
        </div>

                     {/* Боковое выезжающее меню  */}
                     <div className={`${s.side_menu} ${isMenuOpen ? s.side_menu_open : ""}`}>

                     <RxCross2 className={s.close_icon} onClick={toggleMenu} />

          <nav className={s.side_nav_links}>
            <Link to="/" onClick={toggleMenu}>Main page</Link>
            <Link to="/categories" onClick={toggleMenu}>Categories</Link>
            <Link to="/products" onClick={toggleMenu}>All Products</Link>
            <Link to="/sales" onClick={toggleMenu}>All Sales</Link>
          </nav>

          <div className={s.discount_container} onClick={handleOpenModal}>
            <p className={s.discount_text}>1 day discount!</p>
          </div>
        </div>
        
      </div>
      {/* Подключаем модальное окно, передавая все необходимые пропсы */}
      <ModalDiscountContainer
        isModalOpen={isModalOpen}
        productOfTheDay={productOfTheDay}
        loading={loading}
        error={error}
        handleCloseModal={handleCloseModal}
      />



      <div className={s.linie}></div>

      {/* Показывать line для скидки только если showCheckbox установлен в true */}
      {showLine &&
      <div className={s.line}></div>}

    </header>
  );
}

