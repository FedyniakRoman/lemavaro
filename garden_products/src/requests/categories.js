import { loadCategoriesAction } from "../store/reducers/categoriesReducer"
import backendUrl from "../config"

export const getAllCategories = (dispatch) => {
      fetch(`${backendUrl}/categories/all`) //Запрос всех категорий
      .then(res => res.json())
      .then(json => dispatch(loadCategoriesAction(json)))
      .catch(err => console.error('Error fetching categories:', err));
  };
  
  console.log("backendUrl:", backendUrl)
