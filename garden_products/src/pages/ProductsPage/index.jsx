import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../requests/products"; 
import { useDispatch, useSelector } from "react-redux";
import ProductsContainer from "../../components/ProductsContainer";
import { Link } from "react-router-dom";
import s from './index.module.css';

function ProductsPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  const { products: data = [], status } = productsState;

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [isDiscountedOnly, setIsDiscountedOnly] = useState(false);

  // Фильтрация продуктов по цене и скидке
  const filteredProducts = data.filter(product => {
    const price = product.discont_price || product.price;
    const matchesPrice = (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    const matchesDiscount = !isDiscountedOnly || product.discont_price != null;
    return matchesPrice && matchesDiscount;
  });

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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
            <Link to="/" className={s.link}>
              Main page
            </Link>
          </li>
          <li className={s.item}>
            <Link to="/products">All Products</Link>
          </li>
        </ul>
      </nav>
      <div className={s.wrapper}>
        <h2 className={s.title}>All Products</h2>
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
        <div className={s.container}>
          {status === 'loading' ? (
            'Loading products...'
          ) : (
            <ProductsContainer products={sortedProducts} />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;