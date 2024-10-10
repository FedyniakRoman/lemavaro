const defaultProductsState = {
    products: [],
    status: 'loading',
  };
  
  const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
  const CHANGE_STATUS_TO_LOADING = 'CHANGE_STATUS_TO_LOADING';
  
  export const loadProductsAction = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products,
  });
  
  export const changeStatusAction = () => ({
    type: CHANGE_STATUS_TO_LOADING,
  });
  
  export const productsReducer = (state = defaultProductsState, action) => {
    if (action.type === LOAD_PRODUCTS) {
      return {
        products: action.payload,
        status: 'ready',
      };
    } else if (action.type === CHANGE_STATUS_TO_LOADING) {
      return {
        ...state,
        status: 'loading',
      };
    }
    return state;
  };