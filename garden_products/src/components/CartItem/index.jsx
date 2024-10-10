import React from 'react'
import s from "./index.module.css";
function CartItem({id, image, title, count, price}) {
  return (
    <div>
        <p>{title}</p>
        <img
            src={`http://localhost:3333${image}`}
            alt={title}
            className={s.img}
          />
    </div>
  )
}

export default CartItem