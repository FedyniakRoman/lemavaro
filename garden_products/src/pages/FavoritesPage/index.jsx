import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard'; // Компонент для отображения товаров
import s from './index.module.css';
import { deleteProductFromFavoritesAction } from '../../store/reducers/favoritesReducer';
import FavoritesContainer from '../../components/FavoritesContainer';

function FavoritesPage() {
  const favorites = useSelector((store) => store.favorites); // Получаем список избранных товаров
  const dispatch = useDispatch();

  // Функция для обновления localStorage

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [isDiscountedOnly, setIsDiscountedOnly] = useState(false);

  // Фильтрация избранных товаров
  const filteredFavorites = Array.isArray(favorites)
  ? favorites.filter(product => {
    const price = product.discont_price || product.price;
    const matchesPrice = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    const matchesDiscount = !isDiscountedOnly || product.discont_price != null;
    return matchesPrice && matchesDiscount;
  })
  : [];

  // Сортировка товаров
  const sortedFavorites = filteredFavorites.sort((a, b) => {
    const priceA = a.discont_price || a.price;
    const priceB = b.discont_price || b.price;

    if (sortOption === 'asc') return priceA - priceB;
    if (sortOption === 'desc') return priceB - priceA;
    if (sortOption === 'nameAz') return a.title.localeCompare(b.title);
    if (sortOption === 'nameZa') return b.title.localeCompare(a.title);
    return 0;
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minPrice') setMinPrice(value);
    if (name === 'maxPrice') setMaxPrice(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleDiscountChange = () => {
    setIsDiscountedOnly(!isDiscountedOnly);
  };

  return (
    <section className={s.container}>
      <nav className={s.nav}>
        <ul className={s.nav_list}>
          <li className={s.item}>
            <a href="/" className={s.link}>Main page</a>
          </li>
          <li className={s.item}>
            <a href="/favorites" className={s.link}>Favorites</a>
          </li>
        </ul>
      </nav>

      <h2 className={s.title}>Favorites</h2>

      {/* Форма фильтрации и сортировки */}
      <form action="" className={s.form}>
        <label htmlFor="price" className={s.label_price}>
          Price
        </label>
        <input
          type="number"
          name="minPrice"
          placeholder="from"
          className={s.input_price}
          value={minPrice}
          onChange={handlePriceChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="to"
          className={s.input_price}
          value={maxPrice}
          onChange={handlePriceChange}
        />
        
        <label htmlFor="discount" className={s.label_discount}>Discounted items</label>
        <input
          type="checkbox"
          name="discount"
          className={s.input_discount}
          checked={isDiscountedOnly}
          onChange={handleDiscountChange}
        />

        <label htmlFor="sort" className={s.label_sort}>
          Sorted
          <select name="sort" className={s.select_sort} value={sortOption} onChange={handleSortChange}>
            <option value="default">by default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="nameAz">Name: A to Z</option>
            <option value="nameZa">Name: Z to A</option>
          </select>
        </label>
      </form>

      {/* Отображение избранных товаров */}
      <div className={s.favorites_container}>
      {sortedFavorites.length === 0 ? (
        <p>You have no favorite items matching your filters.</p>
      ) : (
        <FavoritesContainer favorites={sortedFavorites} />
      )}
</div>
    </section>
  );
}

export default FavoritesPage;