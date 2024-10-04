import { loadCategoriesAction } from "../store/reducers/categoriesReducer"

export const getAllCategories = (dispatch) => {
    fetch('http://localhost:3333/categories/all')
      .then(res => res.json())
      .then(json => dispatch(loadCategoriesAction(json)))
      .catch(err => console.error('Error fetching categories:', err));
  };
  