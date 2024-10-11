import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingelProductPage } from "../../requests/product";
import s from "./index.module.css";

export default function SingelProductPage() {
  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => getSingelProductPage(product_id, setSingleProduct), []);

  const { product_id } = useParams();

  const { title, price, description, image, category } = singleProduct;

  return (
    <div className={s.product}>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{price}$</p>
        <button>Add to card</button>
        <Link to="/categories/:category_name">
          <span>{category}</span>
        </Link>
      </div>
    </div>
  );
}
