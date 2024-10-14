import { loadProductsAction } from "../store/reducers/productsReducer";
import { loadSingleProductAction } from "../store/reducers/singleProductReducer";


// Получение всех товаров
export const getAllProducts = () => (dispatch) => {
  fetch('http://localhost:3333/products/all') // Запрос всех товаров
    .then(res => res.json())
    .then(json => dispatch(loadProductsAction(json)))
    .catch(err => console.error('Error fetching products:', err));
}

export const getSingleProduct =(product_id)=> {
return dispatch  => {
    fetch(`http://localhost:3333/products/${product_id}`)
    .then(res => res.json())
    .then(json => dispatch(loadSingleProductAction(json)))
    .catch(err =>  console.error("Error fetching product:", err))
    }
}



export const getProductsByCategory = (category_id) => (dispatch) => {
    fetch(`http://localhost:3333/categories/${category_id}`) // Запрос продуктов по категории
      .then(res => res.json())
      .then(json => dispatch(loadProductsAction(json))) // Сохраняем продукты в Redux
      .catch(err => console.error('Error fetching products by category:', err));
  };

