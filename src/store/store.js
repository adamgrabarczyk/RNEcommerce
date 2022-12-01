import { persistStore } from 'redux-persist';

import {rootReducer} from './reducers';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';



export const store = createStore(rootReducer,{ isLoading: false, isError: false, repositories: [] }, applyMiddleware(thunk));
export const persistor = persistStore(store);
