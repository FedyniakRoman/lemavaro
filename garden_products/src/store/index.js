import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { categoriesReducer } from './reducers/categoriesReducer';
import { productsReducer } from './reducers/productsReducer';
import themeReducer from './reducers/themeReducer';     //Импорт themeReducer. Автоматически импортировался без фигурных скобок. Пока что оставляю так... (Lev)


const rootReducer = combineReducers({
    categories: categoriesReducer,
    products: productsReducer,
    theme: themeReducer                     //Редьюсер для Смены Темы.
})

export const store = createStore(rootReducer, applyMiddleware(thunk));