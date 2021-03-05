import {reducer} from './reducers/counter';
import productReducer from './reducers/products'
import {combineReducers} from "redux";


export const reducers = combineReducers({
   counter: reducer,
     products: productReducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})
