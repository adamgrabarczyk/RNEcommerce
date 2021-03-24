import {reducer} from './reducers/counter';
import productReducer from './reducers/products'
import cartReducer from './reducers/cart'
import orderReducer from './reducers/order'
import {combineReducers} from "redux";


export const reducers = combineReducers({
   counter: reducer,
     products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})
