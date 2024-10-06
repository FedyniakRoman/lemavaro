import { loadProductsAction } from "../store/reducers/productsReducer";

export const getAllProducts = (dispatch) => {
    fetch('http://localhost:3333/products/all')
    .then(res => res.json())
    .then(json=> dispatch(loadProductsAction(json)))
    .catch(err => console.error('Error fetching categories:', err));
}

