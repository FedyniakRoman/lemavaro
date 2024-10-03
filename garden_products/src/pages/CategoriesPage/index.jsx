import React, { useEffect } from 'react'
import { getAllCategories } from '../../requests/categories'
import { useDispatch, useSelector } from 'react-redux'
import CategoriesContainer from '../../components/CategoriesContainer'

function CategoriesPage() {

  const categorieState = useSelector(store => store.categories)
  const dispatch = useDispatch()
  useEffect(()=>dispatch(getAllCategories),[])
  
  return (
    <div>
      <CategoriesContainer categories={categorieState}/>
    </div>
  )
}

export default CategoriesPage