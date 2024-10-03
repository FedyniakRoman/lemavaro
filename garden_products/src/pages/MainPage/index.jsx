import React, { useEffect } from "react";
import CategoriesContainer from "../../components/CategoriesContainer";
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../requests/categories";

function MainPage() {
  const categorieState = useSelector((store) => store.categories);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getAllCategories), []);

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
        <CategoriesContainer categories={categorieState} />
        <p></p>
      </section>
    </div>
  );
}

export default MainPage;
