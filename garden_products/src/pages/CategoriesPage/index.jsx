import React, { useEffect } from 'react'
import { getAllCategories } from '../../requests/categories'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesContainer from '../../components/CategoriesContainer'
import { changeStatusAction } from '../../store/reducers/categoriesReducer'

function CategoriesPage() {

  const categorieState = useSelector(store => store.categories)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(changeStatusAction());
    dispatch(getAllCategories)},[])

  const {data, status} = categorieState

  
  return (
    <div>
      {status === 'loading' ? (
        'Categories are loading...'
      ) : (
        <CategoriesContainer categories={data} />
      )}
    </div>
  );
}
export default CategoriesPage