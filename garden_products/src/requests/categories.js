import backendUrl from "../config"; //Переменная для удобного переключения между локальным и удаленным бэкендом.
import { loadCategoriesAction } from "../store/reducers/categoriesReducer"

export const getAllCategories = (dispatch) => {
    fetch(`${backendUrl}/categories/all`) //Запрос всех категорий
      .then(res => res.json())
      .then(json => dispatch(loadCategoriesAction(json)))
      .catch(err => console.error('Error fetching categories:', err));
  };
  