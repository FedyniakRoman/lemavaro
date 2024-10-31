import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../requests/products";
import { useDispatch, useSelector } from "react-redux";
import ProductsContainer from "../../components/ProductsContainer";
import { Link } from "react-router-dom";
import s from "./index.module.css";
import SkeletonContainer from "../../components/SkeletonContainer";
import FilterBar from "../../components/FilterBar";
import {
  changeStatusAction,
  filterByPriceAction,
} from "../../store/reducers/productsReducer";

function ProductsPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();
  // При первом рендере компонента загружаем все продукты
  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts());
  }, []);
  // Извлекаем данные продуктов и статус из состояния
  const { products = [], status } = productsState;
  // Локальные состояния для фильтров минимальной и максимальной цены
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(Infinity);
  // Локальное состояние для фильтра по скидке (checked для чекбокса)
  const [checked, setChecked] = useState(false);
  // Эффект для фильтрации по цене, вызывается при изменении minValue или maxValue
  useEffect(() => {
    dispatch(
      filterByPriceAction({
        min: minValue,
        max: maxValue,
        checked,
      })
    );
  }, [minValue, maxValue, checked]);
  // Фильтрация продуктов по видимости, цене и наличию скидки
  const filteredProducts = Array.isArray(products)
    ? products
        .filter((product) => product.visible) // Сначала фильтруем только видимые продукты
        .filter((product) => {
          const price = product.discont_price || product.price; // Используем цену со скидкой, если она есть, иначе обычную цену
          const isWithinPriceRange = price >= minValue && price <= maxValue; // Проверяем попадание цены в диапазон
          const isDiscounted = checked ? product.discont_price !== null : true; // Если чекбокс активирован, проверяем наличие скидки
          return isWithinPriceRange && isDiscounted; // Продукт должен удовлетворять обеим условиям
        })
    : [];
  // Функция для сброса фильтров
  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(Infinity);
    setChecked(false);
  };
  return (
    <section className={s.container}>
      <nav className={s.nav}>
        <ul className={s.nav_list}>
          <li className={s.item}>
            <Link to="/" className={s.link}>
              Main page
            </Link>
          </li>
          <li className={s.item}>
          
            <Link to="/products" onClick={resetFilters}>
              All Products
            </Link>
          </li>
        </ul>
      </nav>

      <div className={s.wrapper}>
        <h2 className={s.title}>All Products</h2>
        {/* Фильтры: сортировка, диапазон цен и скидки */}
        <FilterBar
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          minValue={minValue}
          maxValue={maxValue}
          setChecked={setChecked}
          checked={checked}
        />
        <div className={s.products_container}>
          {/* Если статус "loading", отображаем скелетон, иначе контейнер с продуктами */}
          {status === "loading" ? (
            <SkeletonContainer count={11} />
          ) : (
            <ProductsContainer products={filteredProducts} />
          )}
        </div>
      
          
        </div>
      
    </section>
  );
}

export default ProductsPage;
