import React from 'react'
import s from './index.module.css'
import CategoryCard from '../CategoryCard'

function CategoriesContainer({ categories, itemsPerRow }) {
  const containerClass = `${s.container} ${itemsPerRow === 4 ? s.fourItems : s.fiveItems}`; // позволяет динамически управлять стилем контейнера в зависимости от переданного количества элементов
  return (
    <div className={containerClass}>
      {categories.map(category => <CategoryCard
        key={category.id}
        {...category}
      />)
      }
    </div>
  )
}

export default CategoriesContainer