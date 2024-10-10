import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { categoriesReducer } from './reducers/categoriesReducer';
import { productsReducer } from './reducers/productsReducer';
import { cartReducer } from './reducers/cartReducer';


const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));