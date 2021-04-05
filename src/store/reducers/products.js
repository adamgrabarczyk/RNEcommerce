import PRODUCT from '../../data/dummy-data';
import {ADD_TO_FAV} from '../actions/products';

const initialState = {
    availableProducts: PRODUCT,
    userProducts: PRODUCT.filter(product => product.ownerId === 'u1'),
    favoriteUserProducts: []
}


export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_FAV:
            const addedProduct = action.pid;

            if (state.favoriteUserProducts.length > 0 && state.favoriteUserProducts.filter(product => product.id =! addedProduct)) {
                return {
                    ...state,
                    favoriteUserProducts: state.favoriteUserProducts.concat(state.availableProducts.filter(product => product.id === addedProduct))
                }
            }else  {

            return {
                ...state,
                favoriteUserProducts: state.availableProducts.filter(product => product.id === addedProduct)
            };
                }
    }

    return state;

};
