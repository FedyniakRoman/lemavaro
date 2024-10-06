import React from 'react'
import s from './index.module.css'
import { Link } from 'react-router-dom'

function ProductCard({id, title, image}) {
  return (
    <div className={s.card}>
    <Link to={`/products/${id}`} className={s.img_container}>
      <img src={`http://localhost:3333${image}`} alt={title} className={s.img}/>
      <p>{title}</p>
    </Link>
  </div>
  )
}

export default ProductCard