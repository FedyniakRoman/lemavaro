import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductsContainer from "../../components/ProductsContainer";
import { getProductsByCategory } from "../../requests/products";
import s from "./index.module.css";
import SkeletonContainer from "../../components/SkeletonContainer";
import { changeStatusAction } from "../../store/reducers/productsByCategoryReducer";
import FilterBar from "../../components/FilterBar";
import { filterByPriceAction } from "../../store/reducers/productsReducer";

function ProductsByCategoryPage() {
  const { category_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getProductsByCategory(category_id)); // Запрос продуктов по категории с сервера
  }, []);

  const productsByCategoryState = useSelector(
    (store) => store.productsByCategory
  );
 
  // Извлекаем данные продуктов и статус из состояния
  const { data = [], category = {}, status } = productsByCategoryState || {}; // Деструктуризация состояния с проверкой

  useEffect(() => {
    if (category && category.title) {
      document.title = `${category.title}`; // Изменяем заголовок страницы
    } else {
      document.title = "Loading..."; // Заголовок при загрузке
    }
  }, [category]);

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
  const filteredProducts = Array.isArray(data)
    ? data
        .filter((product) => product.visible) // Сначала фильтруем только видимые продукты
        .filter((product) => {
          const price = product.discont_price || product.price; // Используем цену со скидкой, если она есть, иначе обычную цену
          const isWithinPriceRange = price >= minValue && price <= maxValue; // Проверяем попадание цены в диапазон
          const isDiscounted = checked ? product.discont_price !== null : true; // Если чекбокс активирован, проверяем наличие скидки
          return isWithinPriceRange && isDiscounted; // Продукт должен удовлетворять обеим условиям
        })
    : [];

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
            <Link to="/categories" className={s.link}>
              Categories
            </Link>
          </li>
          <li className={s.item}>
            {/* Отображаем текущую категорию */}
            {category && (
              <span className={s.current_category} onClick={resetFilters}>
                {category.title}
              </span>
            )}
          </li>
        </ul>
      </nav>

      <h2 className={s.title}>{category ? category.title : "Category"}</h2>

      {/* Фильтры: сортировка, диапазон цен и скидки */}
      <FilterBar
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        minValue={minValue}
        maxValue={maxValue}
        setChecked={setChecked}
        checked={checked}
      />

      {status === "loading" ? (
        <SkeletonContainer count={8} />
      ) : (
        <ProductsContainer products={filteredProducts} />
      )}
    </section>
  );
}

export default ProductsByCategoryPage;
