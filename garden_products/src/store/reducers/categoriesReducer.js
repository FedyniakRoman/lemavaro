const defaultCategoriesState  = {
    data: {},
    status: 'loading'
}

const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const CHANGE_STATUS_TO_LOADING = 'CHANGE_STATUS_TO_LOADING';

export const loadCategoriesAction = categories => ({
    type: LOAD_CATEGORIES,
    payload: categories
})
export const changeStatusAction = () => ({ type: CHANGE_STATUS_TO_LOADING });

export const categoriesReducer = (state = defaultCategoriesState, action) => {
    if(action.type === LOAD_CATEGORIES){
        return {
            data: action.payload,
            status: 'ready'
        }
    } else if (action.type === CHANGE_STATUS_TO_LOADING) {
        return {
            ...state,
            status: 'loading'
        }
    }
    return state
}