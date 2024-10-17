// Определение констант для действий добавления и удаления продукта из корзины
const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
const DELETE_PRODUCT_FROM_CART = "DELETE_PRODUCT_FROM_CART";
const DECREMENT_COUNT = 'DECREMENT_COUNT';
const INCREMENT_COUNT = 'INCREMENT_COUNT';


// Action для добавления продукта в корзину
export const addProductToCartAction = (product) => ({
  type: ADD_PRODUCT_TO_CART,  // Тип действия
  payload: product,  // Продукт, который будет добавлен в корзину
});

// Action для удаления продукта из корзины по его id
export const deleteProductFromCartAction = (product_id) => ({
  type: DELETE_PRODUCT_FROM_CART,  // Тип действия
  payload: product_id,  // id продукта, который будет удалён из корзины
});
export const decrementCountAction = product_id => ({ type: DECREMENT_COUNT, payload: product_id });
export const incrementCountAction = product_id => ({ type: INCREMENT_COUNT, payload: product_id });

// Функция для проверки, есть ли продукт уже в корзине
const checkProduct = (state, payload) => {
  const product = state.find((el) => el.id === payload.id);  // Поиск продукта по его id в состоянии корзины
  if (product) {
    product.count++;  // Если продукт найден, увеличиваем количество
    return [...state];  // Возвращаем обновлённое состояние корзины
  } else {
    return [...state, { ...payload, count: 1 }];  // Если продукт не найден, добавляем его в корзину с количеством 1
  }
};

// Редьюсер для управления состоянием корзины
export const cartReducer = (state = [], action) => {
  if (action.type === ADD_PRODUCT_TO_CART) {
    return checkProduct(state, action.payload);  // Если действие — добавление продукта, вызываем функцию проверки
  } else if (action.type === DELETE_PRODUCT_FROM_CART) {
    return state.filter((el) => el.id !== action.payload);  // Если действие — удаление продукта, фильтруем корзину по id
  }else if (action.type === INCREMENT_COUNT){
    state.find(el => el.id === action.payload).count++
    return [...state]
} else if (action.type === DECREMENT_COUNT){
    const target = state.find(el => el.id === action.payload);

    if(target.count === 1) {
        return state.filter(el => el.id !== action.payload)
    } else {
        target.count--;
        return [...state]
    }
}
  return state;  // Возвращаем текущее состояние, если тип действия не совпадает
};
