import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusAction } from "../../store/reducers/categoriesReducer";
import { getAllProducts } from "../../requests/products";
import ProductsContainer from "../../components/ProductsContainer";
import s from "./index.module.css";
import { Link } from "react-router-dom";
import SkeletonContainer from "../../components/SkeletonContainer";
import FilterBar from "../../components/FilterBar";
import { filterByPriceAction } from "../../store/reducers/productsReducer";

function SalesPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  // При первом рендере компонента загружаем все продукты
  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts());
  }, []);

  // Извлекаем данные продуктов и статус из состояния
  const { products = [], status } = productsState;

  // Фильтрация продуктов по цене
  let discountedProducts = Array.isArray(products)
    ? products.filter((product) => product.discont_price !== null)
    : [];

  // Локальные состояния для фильтров минимальной и максимальной цены
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(Infinity);

  // Эффект для фильтрации по цене, вызывается при изменении minValue или maxValue
  useEffect(() => {
    dispatch(
      filterByPriceAction({
        min: minValue,
        max: maxValue,
      })
    );
  }, [minValue, maxValue]);

  // Фильтрация продуктов по видимости, цене и наличию скидки
  const filteredProducts = Array.isArray(discountedProducts)
    ? discountedProducts
        .filter((product) => product.visible) // Сначала фильтруем только видимые продукты
        .filter((product) => {
          const price = product.discont_price; // Используем цену со скидкой
          const isWithinPriceRange = price >= minValue && price <= maxValue; // Проверяем попадание цены в диапазон
          return isWithinPriceRange;
        })
    : [];

  // Функция для сброса фильтров
  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(Infinity);
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
            <Link to="/sales" onClick={resetFilters}>
              All sales
            </Link>
          </li>
        </ul>
      </nav>
      <div className={s.wrapper}>
        <h2 className={s.title}>Discounted items</h2>
        <FilterBar
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          minValue={minValue}
          maxValue={maxValue}
          showCheckbox={false} // Скрыть чекбокс на странице SalesPage
        />
        <div className={s.container}>
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

export default SalesPage;
