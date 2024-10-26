const defaultProductsState = {
  products: [], // Изначальный массив продуктов
  status: "loading", // Статус загрузки
};

const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const CHANGE_STATUS_TO_LOADING = "CHANGE_STATUS_TO_LOADING";
const SORT_ALL_PRODUCTS = "SORT_ALL_PRODUCTS";
const GET_DISCOUNT_PRODUCTS = "GET_DISCOUNT_PRODUCTS";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";

export const loadProductsAction = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products, // Загружаем продукты
});

export const changeStatusAction = () => ({
  type: CHANGE_STATUS_TO_LOADING, // Изменяем статус на загрузку
});

export const sortAllProductsAction = (option_value) => ({
  type: SORT_ALL_PRODUCTS,
  payload: option_value, // Опция сортировки
});

export const getDiscountProductsAction = (value) => ({
  type: GET_DISCOUNT_PRODUCTS,
  payload: value,
});

export const filterByPriceAction = (values) => ({
  type: FILTER_BY_PRICE,
  payload: values,
});

export const productsReducer = (state = defaultProductsState, action) => {
  if (action.type === LOAD_PRODUCTS) {
    console.log("Action Payload productsReducer:", action.payload);
    return {
      products: action.payload.map((el) => ({ ...el, visible: true })), // Загружаем новые продукты
      status: "ready", // Статус готовности
    };
  } else if (action.type === CHANGE_STATUS_TO_LOADING) {
    return {
      ...state,
      status: "loading", // Устанавливаем статус загрузки
    };
  } else if (action.type === SORT_ALL_PRODUCTS) {
    const sortedProducts = [...state.products]; // Копируем продукты для сортировки

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
    return {
      ...state,
      products: sortedProducts, // Обновляем продукты после сортировки
    };
  } else if (action.type === GET_DISCOUNT_PRODUCTS) {
    const filteredProducts = state.products.map((el) => ({
      ...el,
      visible: action.payload ? el.discont_price : true, // Устанавливаем видимость для скидочных товаров
    }));
    return {
      ...state,
      products: filteredProducts, // Обновляем видимость продуктов
    };
  } else if (action.type === FILTER_BY_PRICE) {
    const { min, max } = action.payload;
    const filteredProducts = state.products.map((product) => ({
      ...product,
      visible: product.price >= min && product.price <= max, // Setze Sichtbarkeit basierend auf dem Preis
    }));

    return {
      ...state, // Behalte den Rest des state unverändert
      products: filteredProducts, // Aktualisiere nur die Produkte
    };
  }
  return state; // Возвращаем текущее состояние, если действие не распознано
};
