import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCartAction } from "../../store/reducers/cartReducer"; // Импортируем экшен
import s from "./style.module.css";
import ProductCard from "../ProductCard";

export default function ModalDiscountContainer({
  isModalOpen,
  productOfTheDay,
  loading,
  error,
  handleCloseModal
}) {
  const dispatch = useDispatch();

  // Функция для добавления товара в корзину
  const handleAddToCart = () => {
    dispatch(addProductToCartAction({ ...productOfTheDay, count: 1 }));
  };

  if (!isModalOpen) return null;

  return (
    <div className={s.modal_overlay} onClick={handleCloseModal}>
      <div className={s.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal_header_container}>
          <h2 className={s.modal_header}>
            50% discount on product of the day
          </h2>
          <button
            className={s.modal_close_button}
            onClick={handleCloseModal}
          >
            &times;
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {productOfTheDay && (
          <div className={s.modal_product_card_container}>
            <ProductCard
              id={productOfTheDay.id}
              title={productOfTheDay.title}
              image={productOfTheDay.image}
              price={productOfTheDay.price}
              discont_price={productOfTheDay.discont_price.toFixed(2)}
            />
            <div className={s.add_to_cart_container}>
              <button className={s.add_to_cart_button} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}