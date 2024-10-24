import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../requests/products"; 
import { useDispatch, useSelector } from "react-redux";
import ProductsContainer from "../../components/ProductsContainer";
import { Link } from "react-router-dom";
import s from './index.module.css';
import SkeletonContainer from "../../components/SkeletonContainer";
import { filterByPriceAction, getDiscountProductsAction, sortAllProductsAction } from "../../store/reducers/productsReducer";

function ProductsPage() {

  const dispatch = useDispatch();

  const productsState = useSelector((store) => store.products);
  console.log('productsPage', productsState);

  const { products: data = [], status } = productsState;
  useEffect(() => {
    dispatch(getAllProducts);
  }, []);

  const handleSort = (e) => dispatch(sortAllProductsAction(e.target.value));

  const [checked, setChecked] = useState(false);
    const handleCheck = () => setChecked(!checked);
  
    const handleClick = (e) => {
      setChecked(e.target.checked);
      dispatch(getDiscountProductsAction(e.target.checked));}

    const [ minValue, setMinValue ] = useState(0);
    const [ maxValue, setMaxValue ] = useState(Infinity);

    const handleMinValue = e => setMinValue(e.target.value || 0);
    const handleMaxValue = e => setMaxValue(e.target.value || Infinity);

    useEffect(() => {
      dispatch(filterByPriceAction({
        min: minValue,
        max: maxValue
      }))
    }, [minValue, maxValue]);

    const filteredProducts = data
    .filter(product => product.visible) // Zuerst filtern wir nur sichtbare Produkte
    .filter(product => {
      const price = product.discont_price || product.price; // Verwende den Rabattpreis, falls vorhanden, sonst normalen Preis
      const isWithinPriceRange = price >= minValue && price <= maxValue;
      const isDiscounted = checked ? product.discont_price !== null : true;
      return isWithinPriceRange && isDiscounted; // Produkte müssen beide Bedingungen erfüllen
    });

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
            onChange={handleMinValue}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="to"
            className={s.input_price}
            onChange={handleMaxValue} 
          />
          <label htmlFor="discount" className={s.label_discount}>Discounted items</label>
          <input
            type="checkbox"
            name="discount"
            className={s.input_discount}
            checked={checked} 
            onChange={handleCheck} 
            onClick={handleClick}
          />
          <label htmlFor="sort" className={s.label_sort}>
            Sorted
            <select name="sort" className={s.select_sort} onChange={handleSort}>
              <option value="default">by default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="nameAz">Name: A to Z</option>
              <option value="nameZa">Name: Z to A</option>
            </select>
          </label>
        </form>
        <div className={s.container}>
          {status === 'loading' ? (
            <SkeletonContainer count={11}/>
          ) : (
            <ProductsContainer products={filteredProducts} />
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;