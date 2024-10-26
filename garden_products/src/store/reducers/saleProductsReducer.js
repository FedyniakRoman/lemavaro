const defaultProductsState = {
    saleProducts: [], // Изначальный массив продуктов
    status: 'loading', // Статус загрузки
  };

  const LOAD_SALE_PRODUCTS = 'LOAD_SALE_PRODUCTS';
  const CHANGE_STATUS_TO_LOADING = 'CHANGE_STATUS_TO_LOADING';

  export const loadSaleProductsAction = (saleProducts) => ({
    type: LOAD_SALE_PRODUCTS,
    payload: saleProducts, // Загружаем продукты
  });

  export const changeStatusAction = () => ({
    type: CHANGE_STATUS_TO_LOADING, // Изменяем статус на загрузку
  });

  export const saleProductsReducer = (state = defaultProductsState, action) => {
    if (action.type === LOAD_SALE_PRODUCTS) {
      console.log("Action Payload saleProductsReducer:", action.payload);
      return {
        saleProducts: action.payload.map(el => ({...el, visible: true })), // Загружаем новые продукты
        status: 'ready', // Статус готовности
      };
    }
    return state; // Возвращаем текущее состояние, если действие не распознано
  }