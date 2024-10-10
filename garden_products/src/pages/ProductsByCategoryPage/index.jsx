import React, { useEffect } from 'react';  
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductsContainer from '../../components/ProductsContainer';
import { getProductsByCategory } from '../../requests/products'; 
import s from './index.module.css';

function ProductsByCategoryPage() {
  const { category_id } = useParams(); // Получаем category_id из URL
  const dispatch = useDispatch();
  const productsState = useSelector((store) => store.products);

  const { products: { data, category }, status } = productsState;   //деструктуризация состояния сразу извлекает данные из вложенного объекта. 

  useEffect(() => {
    dispatch(getProductsByCategory(category_id)); // Запрос продуктов по категории с сервера
  }, [category_id, dispatch]);

  useEffect(() => {
    if (category && category.title) {
      document.title = `${category.title}`; // Изменяем заголовок страницы так чтоб тянуло сразу название категории
    } else {
      document.title = 'Loading...'; // Заголовок при загрузке
    }
  }, [category]); // Этот эффект срабатывает, когда категория загружена

  return (
    <section className={s.container}>
      <h2>{category ? category.title : "Category"}</h2>
      {status === 'loading' ? (       
        <p className={s.loading}>Loading products...</p>      //Вот такое будет писать пока грузит,  будем уделять врмя??
      ) : (
        <ProductsContainer products={data} />
      )}
    </section>
  );
}

export default ProductsByCategoryPage;