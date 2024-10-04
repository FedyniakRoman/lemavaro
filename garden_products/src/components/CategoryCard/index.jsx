import React from 'react'
import s from './index.module.css'

function CategoryCard({title, image}) {
  return (
    <div className={s.card}>
      <div className={s.img_container}></div>
        <img src={`http://localhost:3333${image}`} alt={title} />
        <p>{title}</p>
    </div>
  )
}

export default CategoryCard