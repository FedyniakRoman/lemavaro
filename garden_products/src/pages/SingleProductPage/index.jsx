import React, { useEffect, useState } from "react";
import s from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../../requests/products";
import { IoIosHeartEmpty  } from "react-icons/io"; 
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ModalSingelImageContainer from "../../components/ModalSingleImageContainer";
import {
  addProductToCartAction,
} from "../../store/reducers/cartReducer";
import backendUrl from "../../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.
import {addProductToFavoritesAction, deleteProductFromFavoritesAction} from "../../store/reducers/favoritesReducer"


export default function SingleProductPage() {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => dispatch(getSingleProduct(id)), [id]);

  const singleProductState = useSelector((store) => store.singleProduct);
  
  const { status, data } = singleProductState || { status: "loading", data: [], };

  const {title, price, discont_price, description, image} = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let [count, setCount] = useState(1)
  const incrementCount = () => setCount(++count);
  const decrementCount = () =>{
    if(count > 1 ){
    setCount(--count)}
  };

  const favorit = useSelector((store) => store.favorites);
  
    // Ищем текущий товар в избранном 
    const favoritProduct = favorit.find((product) => product.id === id);

    const handleToggleFavorite = () => {
      if (favoritProduct) {
        dispatch(deleteProductFromFavoritesAction(id)); 
      } else {
        dispatch(addProductToFavoritesAction({ id, title, image, price, discont_price })); 
      }
    };
  
  return (
    <div className={s.container_single_card}>

      <nav className={s.nav_container}>
        <ul className={s.nav_list}>
          <li className={s.item}>
            <Link to={"/"} className={s.link}>
              Main page
            </Link>
          </li>
          <li className={s.item}>
            <Link to={"/categories"} className={s.link}>
              Categories
            </Link>
          </li>
          <li className={s.item}>
            <Link to={"/products"} className={s.link}>
              {" "}
              All Products
            </Link>
          </li>
          {data && (
            <li className={s.item}>
              <Link  className={s.card_name} to={`/products/${id}`}>
                {data.title}

              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Блок с изображением продукта */}
      <div className={s.product_details}>
      <div className={s.image_container}>
        <img
          src={`${backendUrl}${image}`} //Получение картинки
          alt={title}
          className={s.image}
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        />
        <ModalSingelImageContainer
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          image={`${backendUrl}${image}`} //Получение картинки
        />
      </div>

      {/* Блок с информацией о продукте и иконка*/}
      <div className={s.inform_container}>
        <div className={s.container_title_and_icons}>
          <Link to={`/products/${id}`} className={s.title_link}>
            <h3 className={s.title}>{`${title}`}</h3>
          </Link>
          <div className={s.icons_container} >
          
          <IoIosHeartEmpty className={s.icon_heart }
          onClick={handleToggleFavorite}
          style={{ color: favoritProduct ? '#92A134' : 'white' }}
             />
          
          </div>
        </div>

        {
        <div className={s.price_container}>
        <span className={s.price_original}>${price}</span>

        {discont_price && discont_price < price && (
          <>
            <span className={s.price_discounted}>
              ${discont_price}
            </span>
            <span className={s.discount_price}>
              -{Math.round(((price - discont_price) / price) * 100)}%
            </span>
          </>
        )}
      </div>
      
        }

      <div className={s.count_container}>
        <div className={s.count_button_container}>
        <button className={s.count_button} onClick={decrementCount}>
  <AiOutlineMinus className={s.count_minus} />
</button>

            <p className={s.count_value}>{count}</p> 
            {/* Количество товаров */}

            <button className={s.count_button} onClick={incrementCount}>
  <AiOutlinePlus className={s.count_plus} />
</button>    
     </div>
  
        <button
          className={s.add_btn}
          onClick={() => dispatch(addProductToCartAction({ id, title, price, discont_price, image, count} ))}
        >
          Add to cart
        </button>
      </div>

      {/* Блок с описанием продукта */}
      <div className={s.description_container}>
        <h3 className={s.description}>Description</h3>
        <p className={s.description_text}>{description}</p>
      </div>
      <div className="s.read_more">
        <h4 className={s.read}> Read more</h4>
      </div>
    </div>
    </div>
    </div>
  );
}
