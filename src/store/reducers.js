import {reducer} from './reducers/counter';
import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import {combineReducers} from "redux";


export const reducers = combineReducers({
    counter: reducer,
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})
