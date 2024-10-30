const ADD_PRODUCT_TO_FAVORITES = "ADD_PRODUCT_TO_FAVORITES";
const DELETE_PRODUCT_FROM_FAVORITES = "DELETE_PRODUCT_FROM_FAVORITES";
const UPDATE_FAVORITES = "UPDATE_FAVORITES";
const LOAD_ALL_FAVORITES = "LOAD_ALL_FAVORITES";
const SORT_ALL_PRODUCTS = "SORT_ALL_PRODUCTS";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";

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

export const sortAllProductsAction = (option_value) => ({
  type: SORT_ALL_PRODUCTS,
  payload: option_value, // Опция сортировки
});

export const filterByPriceAction = (values) => ({
  type: FILTER_BY_PRICE,
  payload: values,
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

export const favoritesReducer = (state = initialState, action) => {
  let newState = state;
  if (action.type === LOAD_ALL_FAVORITES) {
    newState = action.payload;
  } else if (action.type === ADD_PRODUCT_TO_FAVORITES) {
    newState = checkProductInFavorites(state, action.payload);
    console.log("ADD_PRODUCT_TO_FAVORITES", action.payload);
  } else if (action.type === SORT_ALL_PRODUCTS) {
    const sortedProducts = [...newState]; // Копируем продукты для сортировки

    // Проверяем опцию сортировки
    if (action.payload === "price_asc") {
      sortedProducts.sort((a, b) => a.price - b.price); // Сортировка по возрастанию цены
    } else if (action.payload === "price_desc") {
      sortedProducts.sort((a, b) => b.price - a.price); // Сортировка по убыванию цены
    } else if (action.payload === "nameAz") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Сортировка по алфавиту (A-Z)
    } else if (action.payload === "nameZa") {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title)); // Сортировка по алфавиту (Z-A)
    }
    // Если опция "default", возвращаем исходные продукты без изменений
    newState = sortedProducts; // Обновляем продукты после сортировки
  } else if (action.type === FILTER_BY_PRICE) {
    const { min, max } = action.payload;
    // Filter die Produkte basierend auf dem Preis
    newState = state.map((product) => ({
      ...product,
      visible: product.discont_price >= min && product.discont_price <= max,
    }));
  } else if (action.type === DELETE_PRODUCT_FROM_FAVORITES) {
    newState = state.filter((el) => el.id !== action.payload);
  }
  return newState;
};
