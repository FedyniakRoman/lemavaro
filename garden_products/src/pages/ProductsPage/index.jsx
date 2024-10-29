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
  const dispatch = useDispatch();
  const { products = [], status } = useSelector((store) => store.products);

  // Локальні стани для фільтрів
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(Infinity);
  const [checked, setChecked] = useState(false);

  // Завантаження продуктів при першому рендері
  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts());
  }, [dispatch]);

  // Фільтрація по ціні та наявності знижки
  useEffect(() => {
    dispatch(
      filterByPriceAction({
        min: minValue,
        max: maxValue,
        checked,
      })
    );
  }, [minValue, maxValue, checked, dispatch]);

  // Фільтровані продукти
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) => {
        const price = product.discont_price || product.price;
        const isWithinPriceRange = price >= minValue && price <= maxValue;
        const isDiscounted = checked ? product.discont_price !== null : true;
        return product.visible && isWithinPriceRange && isDiscounted;
      })
    : [];

  // Функція для скидання фільтрів
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
            <Link to="/products" onClick={resetFilters} className={s.link}>
              All Products
            </Link>
          </li>
        </ul>
      </nav>

      <div className={s.wrapper}>
        <h2 className={s.title}>All Products</h2>
        {/* Фільтри: сортування, діапазон цін та знижки */}
        <FilterBar
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          minValue={minValue}
          maxValue={maxValue}
          setChecked={setChecked}
          checked={checked}
        />

        <div className={s.products_container}>
          {/* Показуємо Skeleton, якщо статус завантаження */}
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