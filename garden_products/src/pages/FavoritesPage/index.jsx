import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard"; // Компонент для отображения товаров
import s from "./index.module.css";
import { deleteProductFromFavoritesAction, filterByPriceAction } from "../../store/reducers/favoritesReducer";
import FavoritesContainer from "../../components/FavoritesContainer";
import FilterBar from "../../components/FilterBar";

function FavoritesPage() {
  const favorites = useSelector((store) => store.favorites); // Получаем список избранных товаров
  const dispatch = useDispatch();
  console.log("FavoritesPage", favorites);

  // Сохраняем корзину в localStorage при изменении состояния корзины
  useEffect(() => {
    if (favorites.length > 0) {
      // Сохраняем только, если корзина не пуста
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites"); // Удалить пустую корзину из localStorage
    }
  }, [favorites]); // Обновляем при изменении cartState

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
    const filteredProducts = Array.isArray(favorites)
      ? favorites
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
            <a href="/" className={s.link}>
              Main page
            </a>
          </li>
          <li className={s.item}>
            <a href="/favorites" className={s.link}>
              Favorites
            </a>
          </li>
        </ul>
      </nav>

      <h2 className={s.title}>Liked products</h2>

      {/* Форма фильтрации и сортировки */}
      <FilterBar
      setMinValue={setMinValue}
      setMaxValue={setMaxValue}
      minValue={minValue}
      maxValue={maxValue}
      showCheckbox={false} // Скрыть чекбокс на странице
      />
      {/* Отображение избранных товаров */}
      <div className={s.favorites_container}>
        {favorites.length === 0 ? (
          <p>You have no favorite items matching your filters.</p>
        ) : (
          <FavoritesContainer favorites={filteredProducts} />
        )}
      </div>
    </section>
  );
}

export default FavoritesPage;
