const defaultStatus ={
    data:{},
    status:'loading'
}

const LOAD_SINGLE_PRODUCT = "LOAD_SINGLE_PRODUCT";
const SET_LOADING_STATUS = "SET_LOADING_STATUS";

export const loadSingleProductAction = product => ({
  type: LOAD_SINGLE_PRODUCT,
  payload: product,
});

export const setLoadingStatus = () => ({
    type: SET_LOADING_STATUS
});

export const singleProductReducer = (state = defaultStatus, action) => {
  if (action.type === LOAD_SINGLE_PRODUCT) {
    return{
        //...state,
        data: action.payload,
        status: 'ready'
    } 
}  else if (action.type === SET_LOADING_STATUS) {
        return {
            ...state,
            status: 'loading'     // Устанавливаем статус загрузки
        }
  } 
  return state;
  
};
