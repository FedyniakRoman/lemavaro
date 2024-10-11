import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { categoriesReducer } from './reducers/categoriesReducer';
import { productsReducer } from './reducers/productsReducer';
import { singleProductReducer } from './reducers/singleProductReducer';


const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    singleProduct: singleProductReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk));