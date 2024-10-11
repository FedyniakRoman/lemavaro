import { loadProductsAction } from "../store/reducers/productsReducer";
import { loadSingleProductAction } from "../store/reducers/singleProductReducer";


export const getAllProducts =(dispatch)=>{
    fetch('http://localhost:3333/products/all')
    .then(res => res.json())
    .then(json=> dispatch(loadProductsAction(json)))
    .catch(err => console.error('Error fetching products:', err));
}

export const getSingleProductPage =(product_id)=> {
return dispatch  => {
    fetch(`http://localhost:3333/products/${product_id}`)
    .then(res => res.json())
    .then(json => dispatch (loadSingleProductAction(json)))
    .catch(error =>  console.error("Error fetching product:", error))
    }
}


