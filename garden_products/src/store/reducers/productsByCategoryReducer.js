const defaultProductsByCategoryState = {
  category: {}, // Категория
  data: [],
  status: "loading",
};

const LOAD_PRODUCTS_BY_CATEGORY = "LOAD_PRODUCTS_BY_CATEGORY";
const CHANGE_STATUS_TO_LOADING = "CHANGE_STATUS_TO_LOADING";
const SORT_ALL_PRODUCTS = 'SORT_ALL_PRODUCTS';
const GET_DISCOUNT_PRODUCTS = 'GET_DISCOUNT_PRODUCTS';
const FILTER_BY_PRICE = 'FILTER_BY_PRICE';

export const loadProductsByCategoryAction = (productsByCategory) => ({
  type: LOAD_PRODUCTS_BY_CATEGORY,
  payload: productsByCategory,
});
export const changeStatusAction = () => ({ type: CHANGE_STATUS_TO_LOADING });

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

export const productsByCategoryReducer = (
  state = defaultProductsByCategoryState,
  action
) => {
  if (action.type === LOAD_PRODUCTS_BY_CATEGORY) {
    console.log('productsByCategoryReducer',action.payload);
    
    return {
      ...state,
      category: action.payload.category, // Сохраняем информацию о категории
      data: action.payload.data.map((el) => ({ ...el, visible: true })), // Обновляем продукты
      status: "ready",
    }
  } else if (action.type === CHANGE_STATUS_TO_LOADING) {
    return {
        ...state,
        status: 'loading'
    }
  }else if (action.type === SORT_ALL_PRODUCTS) {
    const sortedProducts = [...state.data]; // Копируем продукты для сортировки
    console.log('sortedProducts', sortedProducts);
    
    // Проверяем опцию сортировки
    if (action.payload === 'price_asc') {
      sortedProducts.sort((a, b) => a.price - b.price); // Сортировка по возрастанию цены
    } else if (action.payload === 'price_desc') {
      sortedProducts.sort((a, b) => b.price - a.price); // Сортировка по убыванию цены
    } else if (action.payload === 'nameAz') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Сортировка по алфавиту (A-Z)
    } else if (action.payload === 'nameZa') {
      sortedProducts.sort((a, b) => b.title.localeCompare(a.title)); // Сортировка по алфавиту (Z-A)
    }
    // Если опция "default", возвращаем исходные продукты без изменений
    return {
      ...state,
      data: sortedProducts, // Обновляем продукты после сортировки
    };
  } else if (action.type === GET_DISCOUNT_PRODUCTS) {
    const filteredProducts = state.data.map((el) => ({
      ...el,
      visible: action.payload ? el.discont_price : true, // Устанавливаем видимость для скидочных товаров
    }));
    return {
      ...state,
      data: filteredProducts, // Обновляем видимость продуктов
    };
  } else if (action.type === FILTER_BY_PRICE) {
    const { min, max } = action.payload;
    const filteredProducts = state.data.map((product) => ({
      ...product,
      visible: product.price >= min && product.price <= max, // Устанавливаем видимость в зависимости от цены
    }));

    return {
      ...state,
      data: filteredProducts, // Обновляем продукты в зависимости от фильтра по цене
    };
  }
  return state;
};
