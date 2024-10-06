import React, { useEffect } from "react";
import CategoriesContainer from "../../components/CategoriesContainer";
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../requests/categories";
import { changeStatusAction } from "../../store/reducers/categoriesReducer";
import { getAllProducts } from "../../requests/products";
import ProductsContainer from "../../components/ProductsContainer";


function MainPage() {
  const categorieState = useSelector((store) => store.categories);
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllCategories);
    dispatch(getAllProducts);
  }, []);

  const { data, statusCategorie } = categorieState;
  const limitedData = Array.isArray(data) ? data.slice(0, 4) : [];
  const { products, statusProduct } = productsState;
  console.log('State Products',products);

  return (
    <div className={s.main_page}>
      <section className={s.container}>
        <div className={s.title_container}>
          <h1 className={s.title}>Categories</h1>
          <div className={s.line}></div>
          <div className={s.btn_div}>
            <a href="/categories" className={s.btn_link}>
              <span>All categories</span>
            </a>
          </div>
        </div>
        {statusCategorie === "loading" ? (
          "Categories are loading..."
        ) : (
          <CategoriesContainer categories={limitedData} />
        )}
      </section>
      <section className={s.container}>
        <div className={s.title_container}>
          <h1 className={s.title}>Sale</h1>
          <div className={s.line}></div>
          <div className={s.btn_div}>
            <a href="/sales" className={s.btn_link}>
              <span>All sales</span>
            </a>
          </div>
        </div>
        {statusProduct === "loading" ? (
          "Sale products are loading..."
        ) : (
          <ProductsContainer products={products} />
        )}
      </section>
    </div>
  );
}

export default MainPage;
