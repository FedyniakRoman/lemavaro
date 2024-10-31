import React, { useEffect } from 'react'
import { getAllCategories } from '../../requests/categories'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesContainer from '../../components/CategoriesContainer'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import SkeletonContainer from '../../components/SkeletonContainer'
import { changeStatusAction } from '../../store/reducers/productsByCategoryReducer'

function CategoriesPage() {

  const categorieState = useSelector(store => store.categories)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(changeStatusAction());
    dispatch(getAllCategories)},[])

  const {data, status} = categorieState
  
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
          <Link to={"/categories"}>Categories</Link>
        </li>
      </ul>
    </nav>
    <div className={s.wrapper}>
      <h2 className={s.title}>Categories</h2>
    <div className={s.categories_container}>
      {status === 'loading' ? (
        <SkeletonContainer count={11}/>
      ) : (
        <CategoriesContainer categories={data} itemsPerRow={5} />
      )}
    </div>
    </div>
    </section>
  );
}
export default CategoriesPage