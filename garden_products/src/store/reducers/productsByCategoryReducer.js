const LOAD_PRODUCTS_BY_CATEGORY = 'LOAD_PRODUCTS_BY_CATEGORY';

export const loadProductsByCategoryAction = productsByCategory => ({
  type: LOAD_PRODUCTS_BY_CATEGORY, payload: productsByCategory });

export const productsByCategoryReducer = (state={}, action) => {
  if(action.type === LOAD_PRODUCTS_BY_CATEGORY) {
  return action.payload
}
return state
}