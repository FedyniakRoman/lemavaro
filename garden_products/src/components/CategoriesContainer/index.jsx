import React from 'react'
import s from './index.module.css'
import CategoryCard from '../CategoryCard'

function CategoriesContainer({categories}) {
  return (
    <div className={s.container}>
      {categories.map(category => <CategoryCard
        key={category.id}
        {...category}
      />)
      }
    </div>
  )
}

export default CategoriesContainer