import {reducer} from './reducers/counter';
import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import searchReducer from './reducers/search';
import {combineReducers} from "redux";



export const reducers = combineReducers({
    counter: reducer,
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    search: searchReducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})
