import React, { useEffect, useMemo } from "react";
import CategoriesContainer from "../../components/CategoriesContainer";
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../requests/categories";
import { changeStatusAction } from "../../store/reducers/categoriesReducer";
import { getAllProducts } from "../../requests/products";
import ProductsContainer from "../../components/ProductsContainer";
import DiscountForm from "../../components/DiscountForm";
import DiscountBanner from "../../components/DiscountBanner";



function MainPage() {
  const categorieState = useSelector((store) => store.categories);
  const productsState = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeStatusAction());
    dispatch(getAllCategories);
    dispatch(getAllProducts());
  }, []);

  const { data, statusCategorie } = categorieState;
  const limitedData = Array.isArray(data) ? data.slice(0, 4) : [];
  const { products, statusProduct } = productsState;

  // //  Filtere Produkte mit Rabatt (discont_price nicht null)
  let discountedProducts = Array.isArray(products)
    ? products.filter((product) => product.discont_price !== null)
    : [];

  //  // Funktion, um Produkte zufällig zu mischen
  let getRandomProducts = (arr, num) => {
    const shuffled = arr.sort(() => 0.5 - Math.random()); // Mische die Produkte
    return shuffled.slice(0, num); // Wähle die ersten 'num' Produkte
  };

  // Wähle zufällig 4 Produkte aus
   // Verwende useMemo, um zufällige Produkte zu berechnen und nur bei Änderung von products neu zu berechnen
   const randomDiscountedProducts = useMemo(() => {
    const discountedProducts = Array.isArray(products)
      ? products.filter((product) => product.discont_price !== null)
      : [];
    return getRandomProducts(discountedProducts, 4);
  }, [products]); // Neu berechnen, wenn sich die Produktliste ändert

  return (
    <div className={s.main_page}>
      {/* <DiscountBanner /> */}
      <section className={s.container}>
        <div className={s.title_container}>
          <h1 className={s.title}>Categories</h1>
          <div className={s.line_categories}></div>
          <div className={s.btn_div}>
            <a href="/categories" className={s.btn_link}>
              <span>All categories</span>
            </a>
          </div>
        </div>
        {statusCategorie === "loading" ? (
          "Categories are loading..."
        ) : (
          <CategoriesContainer categories={limitedData} itemsPerRow={4} />
        )}
      </section>
      {/* <div className={s.container}> */}
        <DiscountForm />
      {/* </div> */}
      <section className={s.container}>
        <div className={s.title_container}>
          <h1 className={s.title}>Sale</h1>
          <div className={s.line_sale}></div>
          <div className={s.btn_div}>
            <a href="/sales" className={s.btn_link}>
              <span>All sales</span>
            </a>
          </div>
        </div>
        {statusProduct === "loading" ? (
          "Sale products are loading..."
        ) : (
          <ProductsContainer products={randomDiscountedProducts} />
        )}
      </section>
    </div>
  );
}

export default MainPage;
