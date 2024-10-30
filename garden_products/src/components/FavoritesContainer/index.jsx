import React from 'react'
import ProductCard from '../ProductCard'
import s from './index.module.css'

function FavoritesContainer({favorites}) {
  return (
    <div className={s.favorites_container}>
    {/* Отображение каждого товара в favorites с помощью компонента ProductCard */}
    {favorites.map((product) => (
      <ProductCard key={product.id} {...product} /> // Передача всех свойств товара в ProductCard
    ))}
  </div>
  )
}

export default FavoritesContainer