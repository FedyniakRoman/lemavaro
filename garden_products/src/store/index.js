import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { categoriesReducer } from './reducers/categoriesReducer';
import { productsReducer } from './reducers/productsReducer';
import themeReducer from './reducers/themeReducer';     //Импорт themeReducer. Автоматически импортировался без фигурных скобок. Пока что оставляю так... (Lev)
import { cartReducer } from './reducers/cartReducer';
import {singleProductReducer} from './reducers/singleProductReducer'
import { favoritesReducer } from './reducers/favoritesReducer';


const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    theme: themeReducer,                     //Редьюсер для Смены Темы.
    cart: cartReducer,
    singleProduct:singleProductReducer,
    favorites: favoritesReducer,


})

export const store = createStore(rootReducer, applyMiddleware(thunk));