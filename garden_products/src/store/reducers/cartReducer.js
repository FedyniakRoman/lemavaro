// Определение констант для действий добавления и удаления продукта из корзины
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DELETE_ALL = "DELETE_ALL";
const UPDATE_CART = "UPDATE_CART"

// Action для добавления продукта в корзину
export const addProductToCartAction = (product) => ({
  type: ADD_PRODUCT_TO_CART, // Тип действия
  payload: product, // Продукт, который будет добавлен в корзину
});

// Action для удаления продукта из корзины по его id
export const deleteProductFromCartAction = (product_id) => ({
  type: DELETE_PRODUCT_FROM_CART, // Тип действия
  payload: product_id, // id продукта, который будет удалён из корзины
});

// Action для обновления состояния корзины
export const updateCartAction = (newCart) => ({
  type: "UPDATE_CART",
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
  const product = state.find((el) => el.id === payload.id); // Поиск продукта по его id в состоянии корзины
  if (product) 
    if(payload.count > 1 ){
      product.count += payload.count
      // product.count++; // Если продукт найден, увеличиваем количество
     return [...state] // Возвращаем обновлённое состояние корзины
  } else{
    product.count++;
    return [...state]
  }
  else {
    return [...state, { ...payload }]; // Если продукт не найден, добавляем его в корзину с количеством 1
  }
};

// Загрузка начального состояния корзины из localStorage
const initialState = JSON.parse(localStorage.getItem("cart")) || []; // Проверяем, есть ли сохраненные данные в localStorage

// Редьюсер для управления состоянием корзины
export const cartReducer = (state = initialState, action) => {
  if (action.type === ADD_PRODUCT_TO_CART) {
    return checkProduct(state, action.payload); // Если действие — добавление продукта, вызываем функцию проверки
  } else if (action.type === DELETE_PRODUCT_FROM_CART) {
    return state.filter((el) => el.id !== action.payload); // Если действие — удаление продукта, фильтруем корзину по id
  } else if (action.type === INCREMENT_COUNT) {
    state.find((el) => el.id === action.payload).count++;// Находим продукт по id
    return [...state];
  } else if (action.type === DECREMENT_COUNT) {
    const target = state.find((el) => el.id === action.payload);

    
    if (target.count === 1) {
      return state.filter((el) => el.id !== action.payload);// Если количество 1, удаляем продукт
    } else {
      target.count--;
      return [...state];
    }
  } else if (action.type === DELETE_ALL) {
    return []; // Очищаем корзину
  } else if (action.type === UPDATE_CART) {
    return action.payload // Обновляем состояние корзины
  }
  return state; // Возвращаем текущее состояние, если тип действия не совпадает
};
