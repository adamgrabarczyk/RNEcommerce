import {reducer} from './reducers/counter';
import {combineReducers} from "redux";


export const reducers = combineReducers({
   counter: reducer,
    isLoading: (state = {}) => state,
    isError: (state = {}) => state,
    repositories: (state = {}) => state
})
