const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

export const addProductToCartAction = product => ({ type: ADD_PRODUCT_TO_CART, payload: product });

const checkProduct = (state, payload) => {
    const product = state.find(el => el.id === payload.id);

    if(product){
        product.count++;
        return [...state]
    } else {
        return [...state, {...payload, count: 1}]
    }
}


export const cartReducer = (state = [], action)=>{
    if (action.type === ADD_PRODUCT_TO_CART){
        return checkProduct(state, action.payload)
    } 
    return state
}