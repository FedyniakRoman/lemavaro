const ADD_PRODUCT_TO_FAVORITES = "ADD_PRODUCT_TO_FAVORITES";
const DELETE_PRODUCT_FROM_FAVORITES = "DELETE_PRODUCT_FROM_FAVORITES";

export const addProductToFavoritesAction = (product) => ({
  type: ADD_PRODUCT_TO_FAVORITES,
  payload: product,
});

export const deleteProductFromFavoritesAction = (product_id) => ({
  type: DELETE_PRODUCT_FROM_FAVORITES,
  payload: product_id,
});

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const loadFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const checkProductInFavorites = (state, payload) => {
  const product = state.find((el) => el.id === payload.id);

  if (product) {
    return [...state];
  } else {
    return [...state, { ...payload }];
  }
};


export const favoritesReducer = (state = loadFavoritesFromLocalStorage(), action) => {
  let updatedState = state;


  if (action.type === ADD_PRODUCT_TO_FAVORITES) {
    updatedState = checkProductInFavorites(state, action.payload);
    saveFavoritesToLocalStorage(updatedState); 
    return updatedState;
  }

  if (action.type === DELETE_PRODUCT_FROM_FAVORITES) {
    updatedState = state.filter((el) => el.id !== action.payload);
    saveFavoritesToLocalStorage(updatedState);  
    return updatedState;
  }

  return state;
};