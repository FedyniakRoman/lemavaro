// Определение констант для действий добавления и удаления продукта из корзины
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DELETE_ALL = "DELETE_ALL";
const UPDATE_CART = "UPDATE_CART"

// Action для добавления продукта в корзину
export const addProductToCartAction = (product) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: product,
});

// Action для удаления продукта из корзины по его id
export const deleteProductFromCartAction = (product_id) => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: product_id,
});

// Action для обновления состояния корзины
export const updateCartAction = (newCart) => ({
  type: UPDATE_CART,
  payload: newCart,
});

// Action для уменьшения количества продукта в корзине
export const decrementCountAction = (product_id) => ({
  type: DECREMENT_COUNT,
  payload: product_id,
});

// Action для увеличения количества продукта в корзине
export const incrementCountAction = (product_id) => ({
  type: INCREMENT_COUNT,
  payload: product_id,
});

// Action для удаления всех товаров из корзины
export const deleteAllAction = () => ({ type: DELETE_ALL });

// Функция для проверки, есть ли продукт уже в корзине
const checkProduct = (state, payload) => {
  const product = state.find((el) => el.id === payload.id);
  if (product) {
    product.count++;
    return [...state];
  } else {
    return [...state, { ...payload, count: 1 }];
  }
};

// Загрузка начального состояния корзины из localStorage
const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// Функция для обновления localStorage
const updateLocalStorage = (cartState) => {
  localStorage.setItem("cart", JSON.stringify(cartState));
};

// Редьюсер для управления состоянием корзины
export const cartReducer = (state = initialState, action) => {
  let newState = state;

  if (action.type === ADD_PRODUCT_TO_CART) {
    newState = checkProduct(state, action.payload);
  } else if (action.type === DELETE_PRODUCT_FROM_CART) {
    newState = state.filter((el) => el.id !== action.payload);
  } else if (action.type === INCREMENT_COUNT) {
    state.find((el) => el.id === action.payload).count++;
    newState = [...state];
  } else if (action.type === DECREMENT_COUNT) {
    const target = state.find((el) => el.id === action.payload);
    if (target.count === 1) {
      newState = state.filter((el) => el.id !== action.payload);
    } else {
      target.count--;
      newState = [...state];
    }
  } else if (action.type === DELETE_ALL) {
    newState = [];
  } else if (action.type === UPDATE_CART) {
    newState = action.payload;
  }

  // Обновляем localStorage при каждом изменении состояния корзины
  updateLocalStorage(newState);

  return newState;
};

