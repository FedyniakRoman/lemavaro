import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusAction } from '../../store/reducers/categoriesReducer';
import { getAllProducts } from '../../requests/products';
import ProductsContainer from '../../components/ProductsContainer';
import s from './index.module.css';
import { Link } from 'react-router-dom';
import SkeletonContainer from '../../components/SkeletonContainer';

function SalesPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts());
  }, [dispatch]);

  const { products = [], statusProduct } = productsState; 
  
  let discountedProducts = Array.isArray(products)
  ? products.filter((product) => product.discont_price !== null)
  : [];

  // Фильтрация продуктов по цене
  const filteredProducts = Array.isArray(products) ? discountedProducts.filter((product) => {
    const price = product.discont_price;
    const matchesPrice = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    return matchesPrice;
  }) : [];

  // Сортировка продуктов
  const sortedProducts = filteredProducts.sort((a, b) => {
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
            <Link to="/sales">All sales</Link>
          </li>
        </ul>
      </nav>
      <div className={s.wrapper}>
        <h2 className={s.title}>Discounted items</h2>
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
        <div className={s.container}>
          {statusProduct === 'loading' ? (
            <SkeletonContainer count={11}/>
          ) : (
            <ProductsContainer products={sortedProducts} />
          )}
        </div>
      </div>
    </section>
  );
}

export default SalesPage;