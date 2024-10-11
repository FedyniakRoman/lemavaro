import React, { useEffect } from "react";
import { getAllProducts } from "../../requests/products";
import { useDispatch, useSelector } from "react-redux";
import { changeStatusAction } from "../../store/reducers/categoriesReducer";
import ProductsContainer from "../../components/ProductsContainer";
import s from './index.module.css'
import { Link } from "react-router-dom";

function ProductsPage() {
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllProducts);
  }, []);

  const { products, status } = productsState;

  return (
    <section className={s.container}>
      <nav className={s.nav}>
        <ul className={s.nav_list}>
          <li className={s.item}>
            <Link to={"/"} className={s.link}>
              Main page
            </Link>
          </li>
          <li className={s.item}>
            <Link to={"/products"}>All Products</Link>
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
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="to"
            className={s.input_price}
          />
          <label htmlFor="discount" className={s.label_discount}>Discounted items</label>
          <input type="checkbox" name="discount" className={s.input_discount}/>
          <label htmlFor="sort" className={s.label_sort}>
            Sorted
            <select name="sort" className={s.select_sort}>
              <option>by default</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
              <option value="nameAz">Name: A to Z</option>
              <option value="nameZa">Name: Z to A</option>
            </select>
          </label>
        </form>
        <div className={s.products_container}>
          <ProductsContainer products={products} />
        </div>
      </div>
    </section>
  );
}
export default ProductsPage;
