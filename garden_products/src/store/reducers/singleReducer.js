const LOAD_SINGLE_CATEGORY = 'LOAD_SINGLE_CATEGORY';

export const loadSingleCategoryAction = user => ({ type: LOAD_SINGLE_USER, payload: user });

export const singleCategoryReducer = (state={}, action) => {
    if(action.type === LOAD_SINGLE_CATEGORY){
        return action.payload
    }
    return state
}