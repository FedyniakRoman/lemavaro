import React from 'react'
import s from './index.module.css'
import { Link } from 'react-router-dom'
import backendUrl from '../../config' //Переменная для удобного переключения между локальным и удаленным бэкендом.

function CategoryCard({id, title, image}) {
  return (
    <div className={s.card}>
      <Link to={`/categories/${id}`} className={s.img_container}>
        <img src={`${backendUrl}${image}`} alt={title} className={s.img}/>
        <p>{title}</p>
      </Link>
    </div>
  )
}

export default CategoryCard