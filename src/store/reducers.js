import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import {reducer} from './reducers/counter';
import productReducer from './reducers/products';
import cartReducer from './reducers/cart';
import ordersReducer from './reducers/orders';
import permissionsReducer from './reducers/permissions';
import searchReducer from './reducers/search';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import notificationReducer from './reducers/notifications';
import {combineReducers} from "redux";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const reducers = combineReducers({
    counter: reducer,
    products: productReducer,
    cart: persistReducer(persistConfig, cartReducer),
    orders: ordersReducer,
    permissions: permissionsReducer,
    search: searchReducer,
    auth: authReducer,
    user: userReducer,
    notifications: notificationReducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})

