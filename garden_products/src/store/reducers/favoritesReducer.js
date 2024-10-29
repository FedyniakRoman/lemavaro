const ADD_PRODUCT_TO_FAVORITES = "ADD_PRODUCT_TO_FAVORITES";
const DELETE_PRODUCT_FROM_FAVORITES = "DELETE_PRODUCT_FROM_FAVORITES";
const UPDATE_FAVORITES = "UPDATE_FAVORITES";
const LOAD_ALL_FAVORITES = "LOAD_ALL_FAVORITES";

// Action для добавления продукта в favorites
export const addProductToFavoritesAction = (product) => ({
  type: ADD_PRODUCT_TO_FAVORITES,
  payload: product,
});

// Action для удаления продукта из favorites по его id
export const deleteProductFromFavoritesAction = (product_id) => ({
  type: DELETE_PRODUCT_FROM_FAVORITES,
  payload: product_id,
});

export const loadAllFavoritesAction = (favorites) => ({
  type: LOAD_ALL_FAVORITES,
  payload: favorites,
});

// Action для обновления состояния favorites
export const updateFavoritesAction = (newFavorites) => ({
  type: UPDATE_FAVORITES,
  payload: newFavorites,
});

// Функция для проверки, есть ли продукт уже в favorites
const checkProductInFavorites = (state, payload) => {
  const product = state.find((el) => el.id === payload.id);

  if (product) {
    return [...state];
  } else {
    return [...state, { ...payload, visible: true }];
  }
};

// Загрузка начального состояния корзины из localStorage
const initialState = JSON.parse(localStorage.getItem("favorites")) || [];

export const favoritesReducer = (
  state = initialState,
  action
) => {
  let newState = state;
  if (action.type === LOAD_ALL_FAVORITES) {
    newState = action.payload;
  } else if (action.type === ADD_PRODUCT_TO_FAVORITES) {
    newState = checkProductInFavorites(state, action.payload);
    console.log(newState);
  }

  if (action.type === DELETE_PRODUCT_FROM_FAVORITES) {
    newState = state.filter((el) => el.id !== action.payload);
  }
  return newState;
};
