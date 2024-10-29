import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../components/ProductCard"; // Компонент для отображения товаров
import s from "./index.module.css";
import { deleteProductFromFavoritesAction } from "../../store/reducers/favoritesReducer";
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
      />
      {/* Отображение избранных товаров */}
      <div className={s.favorites_container}>
        {favorites.length === 0 ? (
          <p>You have no favorite items matching your filters.</p>
        ) : (
          <FavoritesContainer favorites={favorites} />
        )}
      </div>
    </section>
  );
}

export default FavoritesPage;
